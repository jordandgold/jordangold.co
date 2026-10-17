import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__emoji" role="img" aria-label="Compass">
        🛸
      </div>
      <div className="jg__hello">404</div>
      <h2 className="heading">Page not found</h2>
      <p>
        The page you're looking for doesn't exist or may have moved. Head back{" "}
        <Link to="/" className="link">
          home
        </Link>{" "}
        or try one of the links above.
      </p>
    </div>
  )
}

export default NotFound
