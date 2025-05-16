# Amazon Boost Landing Page

![Amazon Boost Logo](public/favicon.svg)

## 📋 Project Description

Amazon Boost is an agency specialized in helping Amazon sellers increase their sales. This repository contains the source code for the agency's main website, built with modern technologies such as Astro, integrating Firebase for authentication and message management, and deployed through Cloudflare.

## 🏗️ Site Structure

### Main Page Sections

The main page (`index.astro`) is composed of the following sections:

| Section | Component | Description |
|---------|------------|-------------|
| **Hero** | `src/components/Hero.astro` | Main welcome section with call to action |
| **Welcome** | `src/components/Welcome.astro` | Introduction to Amazon Boost services |
| **Services** | `src/components/Services.astro` | Detailed presentation of offered services |
| **Case Studies** | `src/components/CaseStudies.astro` | Exhibition of previous successful projects |
| **Testimonials** | `src/components/Testimonials.astro` | Reviews and comments from satisfied clients |
| **Contact** | `src/components/Contact.astro` | Contact form for potential clients |

### Subpages

The site has the following main subpages:

- **Blog**
  - Article list: `/blog` (`src/pages/blog/index.astro`)
  - Article detail: `/blog/[slug]` (`src/pages/blog/[slug].astro`)

- **Case Studies**
  - Case study list: `/casos-de-exito` (`src/pages/casos-de-exito/index.astro`)
  - Case study detail: `/casos-de-exito/[slug]` (`src/pages/casos-de-exito/[slug].astro`)

- **Services**
  - Service detail: `/servicios/[slug]` (`src/pages/servicios/[slug].astro`)

- **Administration** *(Requires authentication)*
  - Message panel: `/admin/mensajes` (`src/pages/admin/mensajes.astro`)
  - Message detail: `/admin/mensajes/[id]` (`src/pages/admin/mensajes/[id].astro`)

### Layouts Used

To maintain visual and structural consistency throughout the site:

- `Layout.astro`: Main layout used on most pages
- `BlogPostLayout.astro`: Specific layout for blog posts
- `CaseStudyLayout.astro`: Layout for case study detail pages
- `ServiceLayout.astro`: Layout for service detail pages

## 🧭 Application Routes

| Route | Description |
|------|-------------|
| `/` | Home page (Landing Page) |
| `/blog` | Blog article list |
| `/blog/:slug` | Specific article detail |
| `/casos-de-exito` | Case study list |
| `/casos-de-exito/:slug` | Specific case study detail |
| `/servicios/:slug` | Specific service detail |
| `/admin/mensajes` | Message administration panel (requires authentication) |
| `/admin/mensajes/:id` | Specific message detail in the administration panel |

## 🔥 Firebase Integration

Firebase (`src/lib/firebase.ts`) is used for the following functionalities:

- **Authentication**: User authentication management for secure access to the administration panel, facilitated by `src/components/useGoogleIdentityScript.js`
- **Database**: Storage and retrieval of messages sent through the contact form, managed by the components `src/components/AdminMessages.jsx` and `src/components/MessageDetail.jsx`

## ☁️ Hosting and Configuration with Cloudflare

- **Hosting**: The entire website is hosted using Cloudflare Pages services
- **Domain and DNS**: All configurations related to the domain, DNS records, security (SSL/TLS), and performance optimizations (CDN) are managed through the Cloudflare platform

## 📁 Project Structure

```text
/
├── public/             # Static assets (favicon, images, fonts, etc.)
│   └── favicon.svg
├── src/
│   ├── components/     # Reusable components (Astro, React, etc.)
│   │   ├── AdminMessages.jsx
│   │   ├── Hero.astro
│   │   └── ... (other components)
│   ├── data/           # Static data and content configurations
│   │   ├── blog-data.ts
│   │   ├── testimonials.js
│   │   └── ... (other data files)
│   ├── layouts/        # Layout templates for pages and sections
│   │   ├── Layout.astro
│   │   ├── BlogPostLayout.astro
│   │   └── ... (other layouts)
│   ├── lib/            # Helper code, utilities, and service configurations
│   │   └── firebase.ts
│   └── pages/          # Files that Astro converts into site routes/pages
│       ├── index.astro (Homepage)
│       ├── admin/      # Administration-related pages
│       │   └── mensajes.astro
│       ├── blog/       # Blog pages
│       │   └── [slug].astro
│       └── ... (other pages and route subdirectories)
├── astro.config.mjs    # Main Astro configuration file
├── package.json        # Project dependencies and scripts
├── tailwind.config.mjs # Tailwind CSS configuration file
└── tsconfig.json       # TypeScript configuration file
```

## ⌨️ Commands

All commands are run from the root of the project, in a terminal:

| Command | Action |
|---------|--------|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts the local development server at `http://localhost:4321` |
| `npm run build` | Builds your site for production in the `./dist/` directory |
| `npm run preview` | Previews your production build locally before deploying |
| `npm run astro ...` | Executes Astro CLI commands (e.g., `astro add`, `astro check`) |
| `npm run astro -- --help` | Displays help for the Astro CLI |

## 📝 Contribution

If you wish to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-feature`)
3. Make your changes and commit them (`git commit -m 'Add new feature'`)
4. Push to your fork (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

