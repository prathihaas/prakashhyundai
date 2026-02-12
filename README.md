# Prakash Hyundai Website

Official website for Prakash Hyundai - Authorized Dealer for Nizamabad & Districts.

## Tech Stack

- **Astro** - Modern web framework
- **Tailwind CSS** - Utility-first CSS framework
- **React** - For interactive components
- **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/prathihaas/prakashhyundai.git
cd prakashhyundai
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Building for Production

Build the static site:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
/
├── public/          # Static assets (favicon, images)
├── src/
│   ├── content/     # Content collections (cars, blog posts)
│   ├── i18n/        # Internationalization (English, Telugu, Hindi)
│   ├── layouts/     # Page layouts
│   └── pages/       # Route pages
├── astro.config.mjs # Astro configuration
└── tailwind.config.mjs # Tailwind CSS configuration
```

## Features

- Multi-language support (English, Telugu, Hindi)
- Responsive design
- Car catalog with detailed information
- Blog/Insights section
- Contact and location pages
- WhatsApp integration for inquiries

## Deployment

This is a static site that can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any web server (Apache, Nginx)

Simply upload the contents of the `dist/` folder after building.

## Troubleshooting

### Styling not loading?

Make sure you've installed dependencies and built the project:
```bash
npm install
npm run build
```

For development, use:
```bash
npm run dev
```

### Port already in use?

If port 4321 is already in use, you can specify a different port:
```bash
npm run dev -- --port 3000
```

## License

© 2026 Prakash Hyundai. All rights reserved.
