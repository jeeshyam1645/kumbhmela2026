import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist/public");
const templatePath = path.join(distDir, "index.html");
const template = fs.readFileSync(templatePath, "utf8");

if (!template.includes("<!--seo-->") || !template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing <!--seo--> or <!--app-html--> markers");
}

const ssrEntry = path.join(root, "dist/ssr/entry-server.js");
const { render } = await import(pathToFileURL(ssrEntry).href);

const routes = [
  "/",
  "/about-us",
  "/accommodation",
  "/puja-services",
  "/kumbh-guide",
  "/contact",
  "/privacy",
  "/terms",
  "/thank-you",
];

function apply(templateHtml, url) {
  const { html, head } = render(url);
  if (!head.includes("<title")) {
    throw new Error(`Prerender for ${url} did not produce a <title>`);
  }
  if (!html.includes("<h1")) {
    throw new Error(`Prerender for ${url} did not produce an <h1>`);
  }
  let page = templateHtml.replace(
    /<!--seo-->[\s\S]*?<!--\/seo-->/,
    `<!--seo-->\n${head}\n<!--/seo-->`,
  );
  page = page.replace(
    '<div id="root"><!--app-html--></div>',
    `<div id="root">${html}</div>`,
  );
  return page;
}

const spa = template.replace(
  '<div id="root"><!--app-html--></div>',
  '<div id="root"></div>',
);
fs.writeFileSync(path.join(distDir, "spa.html"), spa);

for (const route of routes) {
  const file =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, apply(template, route));
  console.log("prerendered", route);
}

fs.writeFileSync(path.join(distDir, "404.html"), apply(template, "/404"));
console.log("prerendered /404");

const today = new Date().toISOString().slice(0, 10);
const pages = [
  ["/", "1.0"],
  ["/about-us", "0.6"],
  ["/accommodation", "0.9"],
  ["/puja-services", "0.8"],
  ["/kumbh-guide", "0.8"],
  ["/contact", "0.7"],
  ["/privacy", "0.3"],
  ["/terms", "0.3"],
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([loc, priority]) => `  <url>
    <loc>https://maghmelastays.in${loc === "/" ? "/" : loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log("wrote sitemap.xml", today);
