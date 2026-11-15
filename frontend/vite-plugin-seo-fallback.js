import { portfolioData } from './src/content/portfolio.js';

const SITE_URL = 'https://hari-devx-portfolio.vercel.app';

const { hero, about, skills, experience, education, featuredProject, projects, certifications, stats, contact } = portfolioData;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cleanLabel(value = '') {
  return String(value).replace(/^\$_\s*/, '');
}

function absoluteUrl(path = '') {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function phoneHref(value = '') {
  return `tel:${String(value).replace(/[^\d+]/g, '')}`;
}

function renderLink(href, label) {
  if (!href) return '';
  return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

function renderParagraphs(text = '') {
  return String(text)
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('');
}

function renderList(items = []) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
}

function renderProjectLinks(item) {
  const links = [];
  if (item.liveUrl) links.push(renderLink(item.liveUrl, 'Live Demo'));
  if (item.repoUrl) links.push(renderLink(item.repoUrl, 'Source Code'));
  return links.length ? `<p>${links.join(' · ')}</p>` : '';
}

function renderStaticProjects() {
  return projects
    .map(
      (project) => `<article>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        ${project.achievements?.length ? renderList(project.achievements) : ''}
        <p><strong>Tech:</strong> ${escapeHtml(project.techStack.join(', '))}</p>
        ${renderProjectLinks(project)}
      </article>`,
    )
    .join('\n');
}

function buildStaticHtml() {
  return `<div id="seo-static">
  <header>
    <h1>${escapeHtml(hero.name)}</h1>
    <p><strong>${escapeHtml(hero.title)}</strong> · ${escapeHtml(hero.edu)} · ${escapeHtml(hero.location)} · Grad ${escapeHtml(hero.gradYear)}</p>
    <p>${escapeHtml(hero.valueProp)}</p>
    <p><strong>Availability:</strong> ${escapeHtml(hero.availability)}</p>
    <p>${renderLink(`mailto:${contact.email}`, contact.email)} · ${renderLink(phoneHref(contact.phone), contact.phone)} · ${renderLink(contact.github, 'GitHub')} · ${renderLink(contact.linkedin, 'LinkedIn')} · ${renderLink(absoluteUrl(hero.resumeUrl), 'Download Resume')}</p>
  </header>
  <nav aria-label="Portfolio sections">
    <a href="#seo-about">About</a>
    <a href="#seo-skills">Skills</a>
    <a href="#seo-experience">Experience</a>
    <a href="#seo-education">Education</a>
    <a href="#seo-projects">Projects</a>
    <a href="#seo-contact">Contact</a>
  </nav>
  <section id="seo-about">
    <h2>About</h2>
    ${renderParagraphs(about.summary)}
    ${renderList(about.highlights)}
  </section>
  <section id="seo-skills">
    <h2>Skills</h2>
    ${skills
      .map(
        ({ category, items }) => `<h3>${escapeHtml(category)}</h3>
      ${renderList(items.map((item) => item.name || item))}`,
      )
      .join('\n')}
  </section>
  <section id="seo-experience">
    <h2>Experience</h2>
    ${experience
      .map(
        (item) => `<article>
      <h3>${escapeHtml(cleanLabel(item.role))} — ${escapeHtml(item.company)}</h3>
      <p>${escapeHtml(item.period)}</p>
      ${renderList(item.achievements)}
    </article>`,
      )
      .join('\n')}
  </section>
  <section id="seo-education">
    <h2>Education</h2>
    ${education
      .map(
        (item) => `<article>
      <h3>${escapeHtml(cleanLabel(item.degree))}</h3>
      <p>${escapeHtml(item.school)} · ${escapeHtml(item.years)} · ${escapeHtml(item.score)}</p>
    </article>`,
      )
      .join('\n')}
  </section>
  <section id="seo-stats">
    <h2>Highlights</h2>
    ${renderList(stats.map((item) => `${item.value}${item.suffix} ${item.label} — ${item.context}`))}
  </section>
  <section id="seo-featured">
    <h2>Featured Project: ${escapeHtml(featuredProject.title)}</h2>
    <p>${escapeHtml(featuredProject.description)}</p>
    <p><strong>Problem:</strong> ${escapeHtml(featuredProject.problem)}</p>
    <p><strong>Solution:</strong> ${escapeHtml(featuredProject.solution)}</p>
    <p><strong>Result:</strong> ${escapeHtml(featuredProject.result)}</p>
    <p><strong>Tech:</strong> ${escapeHtml(featuredProject.techStack.join(', '))}</p>
    ${renderProjectLinks(featuredProject)}
  </section>
  <section id="seo-projects">
    <h2>Projects</h2>
    ${renderStaticProjects()}
  </section>
  <section id="seo-certifications">
    <h2>${escapeHtml(certifications.title)}</h2>
    <p>${escapeHtml(certifications.description)}</p>
  </section>
  <section id="seo-contact">
    <h2>Contact</h2>
    <p>
      Email: ${renderLink(`mailto:${contact.email}`, contact.email)}<br />
      Phone: ${renderLink(phoneHref(contact.phone), contact.phone)}<br />
      WhatsApp: ${renderLink(contact.whatsapp, contact.whatsapp)}<br />
      LinkedIn: ${renderLink(contact.linkedin, contact.linkedin)}<br />
      GitHub: ${renderLink(contact.github, contact.github)}<br />
      Resume: ${renderLink(absoluteUrl(hero.resumeUrl), 'Download PDF resume')}
    </p>
  </section>
  <footer>
    <p>${escapeHtml(hero.name)} — ${escapeHtml(hero.title)} · ${escapeHtml(hero.location)}</p>
  </footer>
</div>`.trim();
}

function buildNoscriptHtml() {
  return `<div class="seo-noscript">
  <h1>${escapeHtml(hero.name)}</h1>
  <p><strong>${escapeHtml(hero.title)}</strong> · ${escapeHtml(hero.edu)} · ${escapeHtml(hero.location)}</p>
  <p><strong>Availability:</strong> ${escapeHtml(hero.availability)}</p>
  <p>${escapeHtml(hero.valueProp)}</p>
  <h2>Projects</h2>
  <ul>
    ${projects
      .map(
        (project) =>
          `<li><strong>${escapeHtml(project.title)}</strong> — ${escapeHtml(project.description)} ${project.liveUrl ? renderLink(project.liveUrl, 'Live') : ''} ${project.repoUrl ? renderLink(project.repoUrl, 'Code') : ''}</li>`,
      )
      .join('\n    ')}
  </ul>
  <h2>Contact</h2>
  <p>${renderLink(`mailto:${contact.email}`, contact.email)} · ${renderLink(phoneHref(contact.phone), contact.phone)} · ${renderLink(contact.linkedin, 'LinkedIn')} · ${renderLink(contact.github, 'GitHub')} · ${renderLink(absoluteUrl(hero.resumeUrl), 'Resume')}</p>
</div>`.trim();
}

function buildItemListJson() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Hariharan N',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        url: project.liveUrl || project.repoUrl || undefined,
        keywords: project.techStack.join(', '),
      },
    })),
  };

  return JSON.stringify(itemList).replace(/</g, '\\u003c');
}

const fallbackCss = `
#seo-static,
.seo-noscript {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  line-height: 1.65;
  color: #e8e8e8;
  background: #0d0d0d;
}
#seo-static,
.seo-noscript {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}
#seo-static h1,
.seo-noscript h1 {
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.1;
  margin: 0 0 12px;
  color: #ffffff;
}
#seo-static h2,
.seo-noscript h2 {
  font-size: 1.4rem;
  margin: 32px 0 10px;
  color: #ffffff;
}
#seo-static h3,
.seo-noscript h3 {
  font-size: 1.05rem;
  margin: 18px 0 6px;
  color: #ffffff;
}
#seo-static p,
.seo-noscript p,
#seo-static li,
.seo-noscript li {
  color: #c9c9c9;
}
#seo-static a,
.seo-noscript a {
  color: #38bdf8;
}
#seo-static ul,
.seo-noscript ul {
  padding-left: 1.25rem;
}
#seo-static nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin: 18px 0;
}
#seo-static article {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 16px;
  margin-top: 16px;
}
#seo-static header,
#seo-static footer {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 16px;
  margin-top: 32px;
}
#seo-static header {
  border-top: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 0;
  padding-bottom: 18px;
  margin-top: 0;
}
@media (prefers-color-scheme: light) {
  #seo-static,
  .seo-noscript {
    color: #1a1a2e;
    background: #f5f5f0;
  }
  #seo-static h1,
  #seo-static h2,
  #seo-static h3,
  .seo-noscript h1,
  .seo-noscript h2,
  .seo-noscript h3 {
    color: #111827;
  }
  #seo-static p,
  #seo-static li,
  .seo-noscript p,
  .seo-noscript li {
    color: #374151;
  }
  #seo-static a,
  .seo-noscript a {
    color: #0369a1;
  }
}
`.trim();

const hideFallbackWhenScriptingDisabled = `
#seo-static,
#boot-loader {
  display: none !important;
}
`.trim();

export default function seoFallbackPlugin() {
  return {
    name: 'seo-fallback',
    transformIndexHtml(html) {
      return {
        html: html.replace('<!-- SEO_FALLBACK -->', buildStaticHtml()),
        tags: [
          { tag: 'style', children: fallbackCss, injectTo: 'head' },
          { tag: 'noscript', children: `<style>${hideFallbackWhenScriptingDisabled}</style>`, injectTo: 'head' },
          { tag: 'noscript', children: buildNoscriptHtml(), injectTo: 'body-prepend' },
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: buildItemListJson(),
            injectTo: 'head',
          },
        ],
      };
    },
  };
}
