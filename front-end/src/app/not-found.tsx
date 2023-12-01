"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="not-found">
      <h1 className="not-found-404">404</h1>
      <h1 className="not-found-text">Невідоме посилання</h1>
      <Link className="not-found-link" href={"/"}>
        Повернутись до головної сторінки?
      </Link>
    </div>
  );
}
