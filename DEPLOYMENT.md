# Deployment Setup Instructions

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

## One-Time Setup Required

After merging this PR to the `main` branch, follow these steps to enable deployment:

### Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Skarramushvandango-tech/webside_rokko_records`
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** from the dropdown
5. Click **Save** (if required)

That's it! The workflow will automatically run when you push to the `main` branch.

## Deployment URL

Once deployed, your site will be available at:
```
https://skarramushvandango-tech.github.io/webside_rokko_records/
```

## How It Works

- **Automatic Deployment**: Every push to the `main` branch triggers the deployment workflow
- **Manual Deployment**: You can manually trigger a deployment from the Actions tab:
  1. Go to the **Actions** tab
  2. Select **Deploy to GitHub Pages** workflow
  3. Click **Run workflow** button
  4. Select the `main` branch
  5. Click **Run workflow**

## Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`):
1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds the project with `npm run build`
5. Uploads the `dist/` directory as a Pages artifact
6. Deploys to GitHub Pages

## Troubleshooting

### Workflow fails on first run
- Ensure GitHub Pages is enabled in Settings → Pages
- Make sure "GitHub Actions" is selected as the source

### Site shows 404
- Check that the deployment completed successfully in the Actions tab
- Verify the GitHub Pages URL in Settings → Pages

### Assets not loading
- The site is configured with base path `/webside_rokko_records/`
- All asset references are automatically prefixed with this path during build

## Local Testing

To test the built site locally:

```bash
npm run build
npm run preview
```

This will serve the built site at `http://localhost:4173/webside_rokko_records/`
