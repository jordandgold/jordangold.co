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

`npm run build` outputs the static site to `build/`. Because the site uses client-side routing, the host must serve `index.html` for unknown paths so that direct visits to `/work` and `/about` work.
