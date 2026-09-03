export const boostLimits = Object.freeze({ perMinute: 4, perDay: 10, globalMinute: 12, globalDay: 40, concurrent: 3, leaseMs: 60_000 });

export interface BoostDatabase {
  prepare(sql: string): {
    bind(...values: (string | number)[]): {
      first<T>(): Promise<T | null>;
      run(): Promise<unknown>;
    };
  };
}

// One conditional INSERT is an atomic admission on D1's primary, across instances.
export const admissionSql = `INSERT INTO boost_admissions (id, actor, created_at, lease_until)
SELECT ?1, ?2, ?3, ?4
WHERE (SELECT COUNT(*) FROM boost_admissions WHERE actor = ?2 AND created_at > ?5) < ?6
AND (SELECT COUNT(*) FROM boost_admissions WHERE actor = ?2 AND created_at > ?7) < ?8
AND (SELECT COUNT(*) FROM boost_admissions WHERE created_at > ?5) < ?9
AND (SELECT COUNT(*) FROM boost_admissions WHERE created_at > ?7) < ?10
AND NOT EXISTS (SELECT 1 FROM boost_admissions WHERE actor = ?2 AND finished = 0 AND lease_until > ?3)
AND (SELECT COUNT(*) FROM boost_admissions WHERE finished = 0 AND lease_until > ?3) < ?11
RETURNING id`;

export async function hashBoostVisitor(address: string, secret: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const result = await crypto.subtle.sign('HMAC', key, encoder.encode(address));
  return Array.from(new Uint8Array(result), byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function admitBoostRequest(db: BoostDatabase, actor: string, now = Date.now()) {
  await db.prepare('DELETE FROM boost_admissions WHERE created_at <= ?1').bind(now - 86_400_000).run();
  const id = crypto.randomUUID();
  const row = await db.prepare(admissionSql).bind(
    id, actor, now, now + boostLimits.leaseMs, now - 60_000, boostLimits.perMinute,
    now - 86_400_000, boostLimits.perDay, boostLimits.globalMinute, boostLimits.globalDay, boostLimits.concurrent,
  ).first<{ id: string }>();
  if (!row) return null;
  return async () => { await db.prepare('UPDATE boost_admissions SET finished = 1 WHERE id = ?1').bind(id).run(); };
}
