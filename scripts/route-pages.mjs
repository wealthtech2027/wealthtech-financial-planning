// Give every route its own HTML file (e.g. dist/family-office.html) so GitHub Pages
// serves it with 200 and search engines can index it, instead of falling through to 404.html.
// Routes listed in `meta` also get their own title / description / share image, so links
// shared on WhatsApp, Facebook and LinkedIn show a page-specific preview.
import { readFileSync, writeFileSync } from 'node:fs';

const SITE = 'https://wealthtech.co.il';

const meta = {
	'pension-research': {
		title: 'מהמחקר שלנו לפנסיה שלכם | WealthTech',
		description: 'המחקר של וולת׳טק על ביצועי קרנות הפנסיה בישראל, כפי שהוצג בערוץ 10 - ערוץ הכלכלה של ישראל. צפו במחקר ותאמו בדיקת תיק פנסיוני אישית.',
		image: `${SITE}/og/pension-research.png`,
	},
};

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function withMeta(html, route, m) {
	const set = (re, value) => {
		if (!re.test(html)) throw new Error(`route-pages: meta tag not found for ${route}: ${re}`);
		html = html.replace(re, value);
	};
	const t = escapeAttr(m.title);
	const d = escapeAttr(m.description);
	set(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
	set(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${d}" />`);
	set(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${t}" />`);
	set(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${d}" />`);
	set(/<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${m.image}" />\n    <meta property="og:url" content="${SITE}/${route}" />`);
	set(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${t}" />`);
	set(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`);
	set(/<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${m.image}" />`);
	return html;
}

const routes = [...readFileSync('src/App.tsx', 'utf8').matchAll(/path="\/([^"]+)"/g)].map((m) => m[1]);
const index = readFileSync('dist/index.html', 'utf8');

for (const route of routes) {
	writeFileSync(`dist/${route}.html`, meta[route] ? withMeta(index, route, meta[route]) : index);
}

console.log(`route-pages: created ${routes.length} route files (${Object.keys(meta).length} with custom share meta)`);
