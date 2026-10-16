import headshot from "./Jordan_Gold.jpg";
import {
  ChakraProvider,
  Container,
  defaultSystem,
  Separator,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";

import { applyTheme, getInitialTheme, Theme } from "./theme";
import About from "./pages/About";
import Home from "./pages/Home";
import Work from "./pages/Work";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? "navbar__link navbar__link--active" : "navbar__link";

function Layout() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => applyTheme(theme), [theme]);

  return (
    <Container style={{ maxWidth: "64em" }}>
      <nav className="navbar fade-in">
        <Link className="navbar__profile" to="/">
          <span className="navbar__avatar">
            <img src={headshot} alt="Jordan Gold" />
          </span>
          <span className="navbar__brand">Jordan Gold</span>
        </Link>
        <div className="navbar__right">
          <div className="navbar__links">
            <NavLink className={navLinkClassName} to="/" end>
              Home
            </NavLink>
            <NavLink className={navLinkClassName} to="/work">
              Work
            </NavLink>
            <NavLink className={navLinkClassName} to="/about">
              About
            </NavLink>
          </div>
          <button
            type="button"
            className="navbar__toggle"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <LuSun /> : <LuMoon />}
          </button>
        </div>
      </nav>
      <div
        style={{
          padding: location.pathname === "/" ? "6rem 0" : "0 0 6rem",
          fontSize: "calc(8px + 1.5vmin)",
          lineHeight: 1.7,
          minHeight: "calc(100vh - 5.5rem)",
        }}
      >
        <div key={location.pathname} className="page">
          <Outlet />
        </div>
        <div className="footer fade-in">
          <Separator className="divider" />
          <p>copyright &copy; jordangold.co {currentYear}</p>
        </div>
      </div>
    </Container>
  );
}

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
