import Link from "next/link";

type ErrorMessageProps = {
    code: number;
    message: string;
}

export function ErrorMessage(props: ErrorMessageProps) {
    return (
        <div className="not-found">
          <h1 className="not-found-404">{props.code}</h1>
          <h1 className="not-found-text">{props.message}</h1>
          <Link className="not-found-link" href={"/"}>
            Повернутись до головної сторінки?
          </Link>
        </div>
      );
}