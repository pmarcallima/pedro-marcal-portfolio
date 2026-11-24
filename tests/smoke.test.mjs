import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const html = await readFile(resolve(root, "index.html"), "utf8");
const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";

test("portfolio has the expected structure and content", () => {
  assert.match(html, /<html lang="pt-BR" data-theme="retro">/);
  assert.match(html, /Pedro Marçal Lima/);
  assert.match(html, /marcallimapedro@gmail\.com/);
  assert.match(html, /github\.com\/pmarcallima/);
  assert.match(html, /class="orbit-scene"/);
  assert.match(html, /class="project-card project-blue tilt-card"/);
  assert.match(html, /class="motion-toggle"/);
  assert.match(html, /class="cursor-ring"/);
  assert.match(html, /id="local-time"/);
  assert.match(html, /data-drag/);
  assert.doesNotMatch(html, /theme-switcher|data-theme-choice|Playground/);
  assert.match(html, /class="compiler-status"/);
  assert.match(html, /data-window="GROUP_SOFTWARE\.C"/);
  assert.match(html, /id="ia"/);
  assert.match(html, /AI-NATIVE WORKFLOW/);
  assert.match(html, /ONDE EU<br>CONTRIBUI\./);
  assert.match(html, /Atuei em equipe/);
  assert.match(html, /class="language-switcher"/);
  assert.match(html, /data-lang-choice="en"/);

  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const id of ["inicio", "ia", "experiencia", "skills", "sobre", "contato"]) {
    assert.ok(ids.has(id), `missing section #${id}`);
  }

  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(match[1]), `missing anchor target #${match[1]}`);
  }
});

test("page is fully self-contained", () => {
  assert.ok(css.length > 1000, "inline CSS missing");
  assert.ok(script.length > 1000, "inline JavaScript missing");
  assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"/);
  assert.doesNotMatch(html, /<script[^>]+src=/);
  assert.doesNotMatch(html, /fonts\.googleapis\.com|fonts\.gstatic\.com/);
  assert.match(html, /data:font\/woff2;base64,/);
  assert.match(html, /data:application\/pdf;base64,/);
  assert.match(html, /data:image\/svg\+xml;base64,/);

  const assets = [...html.matchAll(/(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((value) => !/^(#|https?:|mailto:|tel:)/.test(value));

  assert.ok(assets.every((asset) => asset.startsWith("data:")), "external local asset found");
});

test("styles include the retro theme, responsive and reduced-motion support", () => {
  assert.match(css, /@media \(max-width: 880px\)/);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@keyframes wordGlow/);
  assert.match(css, /@keyframes retroWordGlow/);
  assert.match(css, /transform: perspective/);
  assert.match(css, /\.motion-paused/);
  assert.match(css, /\.cursor-ring/);
  assert.match(css, /\[data-drag\]/);
  assert.match(css, /html\[data-theme="retro"\]/);
  assert.match(css, /\.compiler-status/);
  assert.match(css, /attr\(data-window\)/);
  assert.match(css, /\.language-switcher/);
  assert.match(css, /\.ai-panel/);
});

test("script supports motion and Portuguese/English", () => {
  assert.match(script, /prefers-reduced-motion/);
  assert.match(script, /pointer: fine/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /tilt-card/);
  assert.match(script, /pointerdown/);
  assert.match(script, /setPointerCapture/);
  assert.match(script, /requestAnimationFrame/);
  assert.match(script, /Intl\.DateTimeFormat/);
  assert.match(script, /motion-paused/);
  assert.match(script, /data-lang-choice/);
  assert.match(script, /localStorage/);
  assert.doesNotMatch(script, /data-theme-choice|applyTheme|portfolio-theme/);
  assert.match(script, /const translations = \{/);
  assert.match(script, /\n  pt: \{/);
  assert.match(script, /\n  en: \{/);
  assert.match(script, /function applyLanguage/);
  assert.match(script, /navigator\.languages/);
  assert.match(script, /browserLanguage\.startsWith\("en"\)/);
});
