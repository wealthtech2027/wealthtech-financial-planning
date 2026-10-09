// Give every route its own HTML file (e.g. dist/family-office.html) so GitHub Pages
// serves it with 200 and search engines can index it, instead of falling through to 404.html.
import { readFileSync, copyFileSync } from 'node:fs';

const routes = [...readFileSync('src/App.tsx', 'utf8').matchAll(/path="\/([^"]+)"/g)].map((m) => m[1]);

for (const route of routes) {
	copyFileSync('dist/index.html', `dist/${route}.html`);
}

console.log(`route-pages: created ${routes.length} route files`);
