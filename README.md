# jordangold.co

Personal site for Jordan Gold, built with React 19, TypeScript, [Chakra UI](https://chakra-ui.com) v3 and [React Router](https://reactrouter.com), bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

```sh
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The page reloads when you edit files.

`.npmrc` sets `legacy-peer-deps=true` because `react-scripts` 5 declares a TypeScript 4 peer dependency, while the project uses TypeScript 5.

## Scripts

- `npm start` runs the dev server.
- `npm run build` creates a production build in `build/`.
- `npm test` runs the test runner (there are no tests yet).

## Project structure

```
public/index.html   HTML shell: initial loading spinner and pre-paint theme script
src/index.tsx       Entry point: applies the theme, then renders the app in BrowserRouter
src/App.tsx         Layout (navbar, theme toggle, footer) and route definitions
src/pages/          Home, Work and About pages
src/theme.ts        Light/dark theme helpers
src/index.css       All shared styles, theme colors and animations
```

## Routes

| Path     | Page  |
| -------- | ----- |
| `/`      | Home  |
| `/work`  | Work  |
| `/about` | About |

Any other path redirects to `/`.

## Styling

- Shared styles live in `src/index.css`. Colors are CSS variables on `:root`, with dark values under `:root[data-theme="dark"]`.
- One-off styles are inline `style` props in the components.
- Chakra's styles are layered, so the unlayered rules in `index.css` take precedence.

## Dark mode

The theme defaults to the system preference and is saved in `localStorage` once toggled. An inline script in `public/index.html` sets `data-theme` before first paint, so there is no flash of the wrong theme.

## Loading and transitions

- `public/index.html` shows a spinner inside `#root` until the JS bundle loads and React replaces it.
- Components fade up on load, staggered by position, and each page fades in on route change. Animations are disabled for users who prefer reduced motion.

## Deployment

The site deploys to GitHub Pages from `.github/workflows/deploy.yml` on every push to `master` (or by running the workflow manually from the Actions tab).

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

**Base path.** Without a custom domain, GitHub serves the site from `https://<user>.github.io/<repo>/`, so the workflow builds with `PUBLIC_URL=/<repo>` and the router uses it as its `basename`. When `public/CNAME` exists (a custom domain), the site lives at the root and the base path is empty. To attach a domain, add `public/CNAME` containing the domain, set the domain in Settings → Pages, and add the DNS records.

**Direct visits.** The site uses client-side routing, so `/work` or `/about` has no matching file on a static host. `public/404.html` handles this: it saves the requested URL and sends the visitor to the app root, and an inline script in `public/index.html` restores the URL before React Router starts. The workflow fills in the base path in `404.html`. Paths that don't match a page render `src/pages/NotFound.tsx`. This costs one quick redirect on direct visits, and the server still answers with a 404 status.

To preview a production build locally, run `npm run build`.
