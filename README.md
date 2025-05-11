# Amazon Boost Landing Page

## Project Description

This is a landing page for AmazonBoost an agency that helps Amazon sellers improve their sales. The project is built with Astro and uses Firebase for authentication and message management, and Cloudflare for hosting and domain configurations.

### Landing Page Sections

The main page (`index.astro`) is composed of the following sections (inferred from the components in `src/components`):
*   **Hero:** Main welcome section (`src/components/Hero.astro`).
*   **Welcome:** Welcome or introduction section (`src/components/Welcome.astro`).
*   **Services:** Presentation of the services offered (`src/components/Services.astro`).
*   **Case Studies:** Showcase of previous projects (`src/components/CaseStudies.astro`).
*   **Testimonials:** Customer reviews (`src/components/Testimonials.astro`).
*   **Contact:** Contact form or information (`src/components/Contact.astro`).

### Subpages

The site has the following main subpages, based on the structure of `src/pages`:
*   **Blog:**
    *   List of articles: `/blog` (handled by `src/pages/blog/index.astro`).
    *   Article detail: `/blog/[slug]` (handled by `src/pages/blog/[slug].astro`).
*   **Case Studies:**
    *   List of case studies: `/casos-de-exito` (handled by `src/pages/casos-de-exito/index.astro`).
    *   Case study detail: `/casos-de-exito/[slug]` (handled by `src/pages/casos-de-exito/[slug].astro`).
*   **Services:**
    *   Service detail: `/servicios/[slug]` (handled by `src/pages/servicios/[slug].astro`).
      *(Note: There doesn't seem to be a main listing page for all services like `src/pages/servicios/index.astro`)*.
*   **Administration:**
    *   Message panel: `/admin/mensajes` (handled by `src/pages/admin/mensajes.astro`).
    *   Message detail: `/admin/mensajes/[id]` (handled by `src/pages/admin/mensajes/[id].astro`).

### Layouts Used

The following layouts have been defined in `src/layouts` to maintain visual and structural consistency:
*   `Layout.astro`: Main layout used on most pages.
*   `BlogPostLayout.astro`: Specific layout for blog posts.
*   `CaseStudyLayout.astro`: Layout for case study detail pages.
*   `ServiceLayout.astro`: Layout for service detail pages.

## Application Routes

The main routes of the website are detailed below:

*   `/`: Home page (Landing Page).
*   `/blog`: Displays the list of blog articles.
*   `/blog/:slug`: Displays the detail of a specific blog article (e.g., `/blog/algoritmo-amazon`).
*   `/casos-de-exito`: Displays the list of case studies.
*   `/casos-de-exito/:slug`: Displays the detail of a specific case study (e.g., `/casos-de-exito/casa-moderna`).
*   `/servicios/:slug`: Displays the detail of a specific service (e.g., `/servicios/account-audit`).
*   `/admin/mensajes`: Administration panel to view received messages. This route requires authentication.
*   `/admin/mensajes/:id`: Displays the detail of a specific message within the administration panel.

## Firebase Integration

Firebase (`src/lib/firebase.ts`) is used for the following key functionalities:
*   **Authentication:** User authentication management for secure access to the administration panel. This is facilitated by `src/components/useGoogleIdentityScript.js`, suggesting the use of Google Identity for login.
*   **Database (Firestore/Realtime Database):** Storage and retrieval of messages sent through the contact form. These messages are viewed and managed in the administration screen (`/admin/mensajes` and `/admin/mensajes/[id]`). The `src/components/AdminMessages.jsx` and `src/components/MessageDetail.jsx` components interact with this data.

## Hosting and Configuration with Cloudflare

*   **Hosting:** The entire website is hosted using Cloudflare services (probably Cloudflare Pages).
*   **Domain and DNS:** All configurations related to the domain, DNS records, security (SSL/TLS), and performance optimizations (like CDN) are managed through the Cloudflare platform.

## 🚀 Project Structure

Inside your Astro project, you'll see the following main folders and files:

```text
/
├── public/             # Static assets (favicon, images, fonts, etc.)
│   └── favicon.svg
├── src/
│   ├── components/     # Reusable Astro components, React (.jsx), etc.
│   │   ├── AdminMessages.jsx
│   │   ├── Hero.astro
│   │   └── ... (other components)
│   ├── data/           # Static data, mock data, or content configurations.
│   │   ├── blog-data.ts
│   │   ├── testimonials.js
│   │   └── ... (other data files)
│   ├── layouts/        # Layout templates for pages and sections.
│   │   ├── Layout.astro
│   │   ├── BlogPostLayout.astro
│   │   └── ... (other layouts)
│   ├── lib/            # Helper code, utilities, or service configurations.
│   │   └── firebase.ts
│   └── pages/          # Files that Astro converts into site routes/pages.
│       ├── index.astro (Homepage)
│       ├── admin/      # Administration-related pages.
│       │   └── mensajes.astro
│       ├── blog/       # Blog pages.
│       │   └── [slug].astro
│       └── ... (other pages and route subdirectories)
├── astro.config.mjs    # Main Astro configuration file.
├── package.json        # Project dependencies and scripts (npm/yarn/pnpm).
├── tailwind.config.mjs # Tailwind CSS configuration file.
└── tsconfig.json       # TypeScript configuration file.
```

To learn more about the folder structure of an Astro project, refer to [the project structure guide](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, in a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs project dependencies.                   |
| `npm run dev`             | Starts the local development server at `http://localhost:4321`. |
| `npm run build`           | Builds your site for production in the `./dist/` directory. |
| `npm run preview`         | Previews your production build locally before deploying. |
| `npm run astro ...`       | Executes Astro CLI commands (e.g., `astro add`, `astro check`). |
| `npm run astro -- --help` | Displays help for the Astro CLI.                 |
