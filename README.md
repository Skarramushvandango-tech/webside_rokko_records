# ROKKO! Records Website

This is the official website for ROKKO! Records, built with Vite, React, and TypeScript.

## Features

- Modern music label website
- Artist profiles and releases
- Audio player integration
- Responsive design
- Comment form

## Development

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

```bash
npm install
```

### Running locally

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building

```bash
npm run build
```

The built files will be in the `dist` directory.

### Linting

```bash
npm run lint
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

The deployment is handled by GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Manual Deployment

To manually trigger a deployment:
1. Go to the repository's Actions tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

### Setup GitHub Pages

To enable GitHub Pages deployment:
1. Go to repository Settings
2. Navigate to Pages section
3. Under "Build and deployment", select "GitHub Actions" as the source

The site will be deployed to: `https://skarramushvandango-tech.github.io/webside_rokko_records/`

## Project Structure

- `/src` - React TypeScript source files
- `/assets` - Static assets (images, videos, CSS, JS)
- `/artists` - Artist-specific content (photos, audio, covers)
- `/dist` - Built files (generated, not in git)
- `/.github/workflows` - GitHub Actions workflows

## Technologies

- Vite - Build tool
- React - UI framework
- TypeScript - Type safety
- Tailwind CSS - Utility-first CSS
- ESLint - Code linting
