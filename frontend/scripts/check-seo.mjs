import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { portfolioData } from '../src/content/portfolio.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = resolve(root, 'dist/index.html');

let html;
try {
  html = readFileSync(indexPath, 'utf8');
} catch {
  console.error(`SEO check failed: could not read ${indexPath}. Run "npm run build" first.`);
  process.exit(1);
}

const { hero, projects, contact, seo, featuredProject } = portfolioData;

const required = [
  ['site name', hero.name],
  ['job title', hero.title],
  ['meta description', seo.description],
  ['canonical link', '<link rel="canonical"'],
  ['absolute OG image', 'https://hari-devx-portfolio.vercel.app/images/og-image.webp'],
  ['static fallback', 'id="seo-static"'],
  ['noscript fallback', '<noscript>'],
  ['contact email', contact.email],
  ['GitHub link', contact.github],
  ['LinkedIn link', contact.linkedin],
  ['resume link', '/documents/Hariharan.pdf'],
  ['featured project', featuredProject.title],
  ...projects.map((project) => [`project: ${project.title}`, project.title]),
];

const forbidden = ['[live URL', '[X]', '[Y]', '$_ ', 'TODO'];
const missing = required.filter(([, needle]) => !html.includes(needle));
const present = forbidden.filter((needle) => html.includes(needle));

if (missing.length || present.length) {
  console.error('SEO check failed.');
  if (missing.length) {
    console.error('Missing required content:');
    for (const [label, needle] of missing) console.error(`  - ${label} (${needle})`);
  }
  if (present.length) {
    console.error('Found unresolved placeholders:');
    for (const needle of present) console.error(`  - ${needle}`);
  }
  process.exit(1);
}

console.log(`SEO check passed: ${required.length} required strings present, no placeholders.`);
