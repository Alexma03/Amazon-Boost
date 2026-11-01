import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {servicePages} from '../src/data/service-pages.ts';
import {unlockingService as details} from '../src/data/unlocking-service.ts';
const {parse}=createRequire(import.meta.resolve('astro'))('parse5');
const walk=(node,predicate)=>[...(predicate(node)?[node]:[]),...(node.childNodes??[]).flatMap(n=>walk(n,predicate))];
const attr=(node,key)=>node.attrs?.find(a=>a.name===key)?.value;
const text=node=>node.nodeName==='#text'?node.value:(node.childNodes??[]).map(text).join('');
const byClass=(node,name)=>walk(node,n=>attr(n,'class')?.split(/\s+/).includes(name));
const tree=()=>parse(readFileSync(new URL('../dist'+details.path+'index.html',import.meta.url),'utf8'));
const page=servicePages.find(p=>p.path===details.path);

test('unlocking hero prioritizes WhatsApp and states our first response separately from Amazon resolution',()=>{
  const doc=tree();const hero=byClass(doc,'growth-hero')[0];
  const response=byClass(doc,'unlock-response');
  assert.equal(response.length,2);
  for(const block of response){assert.ok(text(block).includes(details.responseTime));assert.ok(text(block).includes(details.responseNote));}
  const links=byClass(hero,'growth-actions').flatMap(n=>walk(n,a=>a.tagName==='a'));
  assert.equal(attr(links[0],'href'),details.whatsapp);
  assert.equal(text(links[0]).trim(),'Escríbenos por WhatsApp');
  assert.equal(attr(links[1],'href'),'/#auditoria');
  assert.equal(attr(links[2],'href'),'#alcance');
  assert.ok(text(hero).includes('Sin promesas de reactivación ni plazos que dependan de terceros.'));
  assert.ok(text(doc).includes(page.deliverable));
});

test('unlocking includes all stated causes and seven early steps before the existing process',()=>{
  const doc=tree();const main=walk(doc,n=>n.tagName==='main')[0];const copy=text(main);
  for(const reason of ['Cuenta suspendida o desactivada.','Verificación de identidad / verificación KYC pendiente o rechazada.','Amazon me pide facturas del proveedor o documentación adicional.','Fondos retenidos o pagos bloqueados.','Problemas de rendimiento de la cuenta (métricas, Account Health).','Apelaciones rechazadas o respuestas sin solución.'])assert.ok(copy.includes(reason),reason);
  for(const phrase of ['cuenta de Amazon bloqueada','desbloqueo de cuenta Amazon','verificación KYC Amazon','fondos retenidos Amazon','apelación Amazon'])assert.ok(copy.includes(phrase),phrase);
  assert.ok(copy.includes('Respondemos en menos de 24 horas laborables.'));
  const first=walk(main,n=>attr(n,'id')==='primeras-24-horas')[0];
  assert.ok(text(first).includes('Tu cuenta se ha bloqueado: qué hacer en las primeras 24 horas'));
  assert.equal(walk(first,n=>n.tagName==='li').length,7);
  assert.equal(attr(walk(first,n=>n.tagName==='a')[0],'href'),details.whatsapp);
  assert.equal(text(walk(first,n=>n.tagName==='a')[0]).trim(),'Cuéntanos tu caso');
  assert.match(text(first),/necesidad comercial legítima/);
  assert.doesNotMatch(text(first),/no lo permite sin autorización/);
  const ids=walk(main,n=>n.tagName==='section').map(n=>attr(n,'id'));
  assert.ok(ids.indexOf('encaje')<ids.indexOf('primeras-24-horas'));
  assert.ok(ids.indexOf('primeras-24-horas')<ids.indexOf('alcance'));
});

test('unlocking FAQ and Service schema match visible questions, include no prices and guarantee no Amazon result or date',()=>{
  const doc=tree();const main=walk(doc,n=>n.tagName==='main')[0];
  const graph=walk(doc,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>{const json=JSON.parse(text(n));return json['@graph']??[json];});
  const service=graph.find(n=>n['@type']==='Service');
  assert.equal(service.offers,undefined);
  assert.ok(service.termsOfService.includes(details.responseTime));
  assert.match(service.termsOfService,/decisión.*corresponde a Amazon/);
  const faq=graph.filter(n=>n['@type']==='FAQPage');assert.equal(faq.length,1);
  const faqSection=walk(main,n=>attr(n,'id')==='preguntas')[0];const visible=walk(faqSection,n=>n.tagName==='details');
  assert.equal(visible.length,6);assert.equal(faq[0].mainEntity.length,6);
  for(const item of faq[0].mainEntity)assert.ok(visible.some(n=>text(n).includes(item.name)&&text(n).includes(item.acceptedAnswer.text)));
  const kyc=page.faqs.find(f=>f.question==='¿Qué hago si Amazon me pide la verificación KYC o facturas de proveedor?');
  assert.match(kyc.answer,/auténticos, completos y legibles/);
  const funds=page.faqs.find(f=>f.question==='¿Cuánto tiempo retiene Amazon los fondos de una cuenta bloqueada?');
  assert.match(funds.answer,/Depende del caso y lo decide Amazon/);assert.match(funds.answer,/No garantizamos una fecha/);
  assert.doesNotMatch(funds.answer,/\d+\s*(?:días|horas|meses)/);
  assert.doesNotMatch(text(main),/€|\b(?:EUR|USD|tarifas?|precios?)\b/i);
  assert.ok(!graph.some(n=>['Review','AggregateRating'].includes(n['@type'])));
  assert.equal(details.caseStudy,null);assert.equal(walk(main,n=>attr(n,'id')==='caso-real-desbloqueo').length,0);
});

test('unlocking-specific content does not change the other commercial pages',()=>{
  for(const other of servicePages.filter(p=>p.path!==details.path)){
    const doc=parse(readFileSync(new URL('../dist'+other.path+'index.html',import.meta.url),'utf8'));
    assert.equal(byClass(doc,'unlock-response').length,0,other.path);
    assert.equal(walk(doc,n=>attr(n,'id')==='primeras-24-horas').length,0,other.path);
    assert.equal(byClass(doc,'unlock-topics').length,0,other.path);
    const hero=byClass(doc,'growth-hero')[0];const links=byClass(hero,'growth-actions').flatMap(n=>walk(n,a=>a.tagName==='a'));
    assert.equal(attr(links[0],'href'),'#contacto',other.path);
  }
});
