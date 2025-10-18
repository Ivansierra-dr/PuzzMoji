import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

// Configuración para desarrollo local vs producción (Vercel)
const isDev = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;

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

// Start a local server to serve the built app
async function startLocalServer() {
  const { default: handler } = await import('serve-handler');
  const http = await import('http');

  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: distPath,
      cleanUrls: false,
      // Serve index.html for SPA routes
      rewrites: [
        { source: '/', destination: '/index.html' },
        { source: '/game', destination: '/index.html' },
        { source: '/about', destination: '/index.html' },
        { source: '/contact', destination: '/index.html' },
        { source: '/privacy-policy', destination: '/index.html' },
        { source: '/terms-of-service', destination: '/index.html' },
        { source: '/faq', destination: '/index.html' },
        { source: '/blog', destination: '/index.html' },
        { source: '/trivia', destination: '/index.html' },
        { source: '/legal', destination: '/index.html' },
        { source: '/legal-notice', destination: '/index.html' }
      ]
    });
  });

  return new Promise((resolve) => {
    server.listen(3000, () => {
      console.log('✓ Local server started at http://localhost:3000');
      resolve(server);
    });
  });
}

async function prerenderRoutes() {
  console.log('🚀 Starting pre-rendering process...\n');

  // Start local server
  const server = await startLocalServer();

  // Launch browser - usa Chrome local en dev, Chromium serverless en producción
  let browser;
  if (isDev) {
    // Desarrollo local: intenta usar Chrome local instalado
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : process.platform === 'linux'
        ? '/usr/bin/google-chrome'
        : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }).catch(async () => {
      // Fallback: usa Chromium de @sparticuz
      console.log('  ⚠️  Chrome no encontrado, usando Chromium de @sparticuz...');
      return puppeteer.launch({
        headless: true,
        executablePath: await chromium.executablePath(),
        args: chromium.args
      });
    });
  } else {
    // Producción (Vercel): usa @sparticuz/chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless
    });
  }

  try {
    for (const route of routes) {
      const url = `http://localhost:3000${route}`;
      console.log(`📄 Pre-rendering: ${route}`);

      const page = await browser.newPage();

      // Go to the page
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for React Router to render the correct component
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Wait for React Helmet to finish updating meta tags
      await page.waitForFunction(() => {
        const canonical = document.querySelector('link[rel="canonical"]');
        return canonical && canonical.href.includes(window.location.pathname);
      }, { timeout: 5000 }).catch(() => {
        console.log(`  ⚠️  Warning: canonical may not have updated for ${route}`);
      });

      // Get the HTML with all meta tags applied
      const html = await page.content();

      // Create directory for route
      const routePath = route === '/' ? '' : route;
      const dir = path.join(distPath, routePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the pre-rendered HTML
      fs.writeFileSync(path.join(dir, 'index.html'), html);

      console.log(`  ✓ Saved to: ${routePath || '/'}/index.html`);

      await page.close();
    }

    console.log('\n✅ Pre-rendering complete!');
  } catch (error) {
    console.error('\n❌ Pre-rendering failed:', error);
    throw error;
  } finally {
    await browser.close();
    server.close();
  }
}

prerenderRoutes().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
