# Amazon Boost - AI Coding Instructions

## Project Overview
Amazon Boost is an Astro-based marketing website for an Amazon seller agency, deployed on Cloudflare Pages with SSR. The site showcases services, case studies, and blog content while managing client inquiries through Firebase.

## Architecture & Tech Stack

- **Framework**: Astro 5.x with SSR (`output: 'server'`, `@astrojs/cloudflare` adapter)
- **UI Libraries**: Astro components (primary), React 18 (admin panel), Tailwind CSS
- **Backend**: Firebase (Firestore + Auth), Google Identity Services for OAuth
- **Deployment**: Cloudflare Pages with server-side rendering

## Critical Patterns

### 1. Content Management System
All content lives in `src/data/` as structured JavaScript/TypeScript modules:

```javascript
// Pattern: Export individual data objects + aggregated arrays/maps
export const accountAuditData = { slug, title, description, benefits, ... };
export const allServices = [accountAuditData, accountManagementData, ...];
export const servicesBySlug = { [accountAuditData.slug]: accountAuditData, ... };
```

**When adding new content**: Create a module in the appropriate `src/data/` subfolder, then update the index file to export it in both the array and slug map.

### 2. Dynamic Routing with Static Props
Pages use Astro's `[slug].astro` pattern with prerendering disabled for SSR:

```astro
export async function getStaticPaths() {
  return allBlogPosts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
```

**Service pages**: Use `servicesBySlug[slug]` lookup (not `getStaticPaths`)  
**Blog/Case Studies**: Use `getStaticPaths()` for build-time generation

### 3. Firebase Integration Points

**Client-side only** (uses `import.meta.env.PUBLIC_*`):
- Contact form submission (`Contact.astro` inline script)
- Admin authentication (`AdminMessages.jsx`)
- Message management (`MessageDetail.jsx`)

**Key Firebase pattern**:
```javascript
// src/lib/firebase.ts initializes app singleton
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
```

**Admin auth flow**: Google OAuth via `useGoogleIdentityScript.js` hook → `signInWithCredential` → React component `onAuthStateChanged` listener

### 4. Tailwind Custom Theme
Uses Amazon brand colors defined in `tailwind.config.mjs`:
- `amazon-orange` (#FF9900) - Primary CTA color
- `amazon-black` (#131921) - Text/headers
- `amazon-darkblue` / `amazon-blue` (#232F3E) - Navigation/footers

**Important**: Also defined in CSS custom properties in `Layout.astro` for non-Tailwind contexts.

## Component Organization

### Page Composition Pattern
Main pages assemble multiple components (see `src/pages/index.astro`):
```astro
<Layout title="...">
  <Hero />
  <Services />
  <AboutUs />
  <CaseStudies />
  <Testimonials />
  <Contact />
</Layout>
```

**Layouts hierarchy**: `Layout.astro` (base) → specialized layouts (`BlogPostLayout`, `ServiceLayout`, `CaseStudyLayout`)

### React Islands (Client Hydration)
Only admin components use React:
- `AdminMessages.jsx` - Message list with Google OAuth
- `MessageDetail.jsx` - Individual message view
- `useGoogleIdentityScript.js` - OAuth script loader hook

**When to use React**: Only for stateful admin features requiring client-side Firebase interactions. Prefer Astro components for marketing pages.

## Development Workflow

### Commands (PowerShell)
```powershell
npm run dev      # Start dev server at localhost:4321
npm run build    # Production build for Cloudflare
npm run preview  # Preview production build locally
```

### Environment Variables
Required in `.env` (prefix `PUBLIC_` for client-side access):
```
PUBLIC_FIREBASE_API_KEY=...
PUBLIC_FIREBASE_AUTH_DOMAIN=...
PUBLIC_FIREBASE_PROJECT_ID=...
PUBLIC_GOOGLE_IDENTITY_CLIENT_ID=...
```

### Firestore Schema
Collection: `email_submissions`
```javascript
{
  name: string,
  email: string,
  phone: string | null,
  company: string | null,
  subject: string,
  message: string,
  status: 'read' | 'unread',
  created_at: ISO8601 string
}
```

**Index required**: Composite index on `(status, created_at DESC)` for filtered queries in `AdminMessages.jsx`.

## Common Tasks

### Adding a New Service
1. Create `src/data/services/new-service.js` with required fields: `slug`, `title`, `description`, `benefits`, `metaTitle`, `metaDescription`
2. Import and add to `allServices` + `servicesBySlug` in `src/data/services/index.js`
3. Service automatically appears in navigation and becomes accessible at `/servicios/[slug]`

### Adding a Blog Post
1. Create `src/data/blog/new-post.ts` implementing `BlogPost` interface
2. Import and add to `allBlogPosts` + `blogPostsBySlug` in `src/data/blog/index.ts`
3. Use `sections` array (not raw `content` string) for structured content rendering

### Modifying Admin Features
- Authentication: Edit `AdminMessages.jsx` → `useEffect` with `window.google.accounts.id.initialize`
- Message queries: Modify Firestore query in `fetchMessages()` function
- Status updates: Use `updateDoc(doc(db, 'email_submissions', messageId), { status })` pattern

## Gotchas & Troubleshooting

- **Firestore "failed-precondition" error**: Missing composite index. Create in Firebase Console: `email_submissions` → `(status, created_at DESC)`
- **Google OAuth not loading**: Check `useGoogleIdentityScript.js` loaded before initialization. Script must load with `defer` attribute.
- **Astro component styles not applying**: Ensure `<style>` blocks use `is:global` for Tailwind utilities or scoped styles for component-specific CSS.
- **Dynamic routes not working in production**: Services use slug lookup (SSR), not `getStaticPaths`. Blog/case studies use `getStaticPaths` with `export const prerender = true`.

## Code Style Conventions

- **File naming**: kebab-case for all files (`account-audit.js`, not `accountAudit.js`)
- **Component language**: Astro for static/server components, React for client-interactive admin features
- **Styling**: Tailwind utility classes preferred; component-scoped `<style>` blocks for complex animations
- **Imports**: Relative paths with `.js`/`.ts` extensions (e.g., `from '../lib/firebase.ts'`)
