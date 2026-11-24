# Portfólio — Pedro Marçal Lima

Portfólio de página única, bilíngue (PT/EN) e totalmente self-contained em `index.html`.

O idioma é detectado automaticamente pelo navegador na primeira visita. Depois, a escolha manual PT/EN fica salva.

CSS, JavaScript, fontes, favicon e currículo estão embutidos no HTML. Não há bibliotecas, dependências de runtime, build ou requisições externas para carregar o site.

## Rodar localmente

```bash
npm start
```

Depois, abra `http://localhost:4174`.

Também é possível abrir o `index.html` diretamente no navegador ou usar qualquer servidor estático:

```bash
python3 -m http.server 4174
```

## Testes

```bash
npm test
```

Os testes verificam a estrutura, os âncoras, o caráter self-contained, o visual Retro PC, os idiomas PT/EN, a responsividade e o suporte a movimento reduzido.

## Onde editar

Tudo está em `index.html`:

- Conteúdo e traduções: elementos `data-i18n`, `data-i18n-html`, `data-i18n-aria` e `data-i18n-content`
- Cores e layout: bloco `<style>`
- Animações e interações: bloco `<script>`
- Visual fixo **Retro PC / Compiler**
- Alternância entre **PT** e **EN**: seletor no canto inferior esquerdo
- Controle de movimento e etiquetas arrastáveis: botão flutuante e elementos marcados com `data-drag`
- Currículo para download: link `data:application/pdf;base64,...`

## Publicar

Envie apenas o `index.html` para Netlify, Vercel, GitHub Pages ou qualquer hospedagem estática. Não existe etapa de build.
