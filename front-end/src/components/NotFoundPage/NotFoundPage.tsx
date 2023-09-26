import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <h1 className="not-found-404">404</h1>
      <h1 className="not-found-text">Невідоме посилання</h1>
      <Link className="not-found-link" to={"/"}>
        Повернутись до головної сторінки?
      </Link>
    </div>
  );
}
