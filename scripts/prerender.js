import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define all routes that need to be pre-rendered
const routes = [
  '/',
  '/game',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/faq',
  '/blog',
  '/trivia',
  '/legal',
  '/legal-notice'
];

// Read the base HTML template
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');

// Create a directory for each route
routes.forEach(route => {
  const routePath = route === '/' ? '/index' : route;
  const dir = path.join(__dirname, '../dist', routePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the HTML file (canonical is handled by React Helmet in each page component)
  fs.writeFileSync(path.join(dir, 'index.html'), template);

  console.log(`✓ Pre-rendered: ${route}`);
});

console.log('Pre-rendering complete!');