import { useState } from "react";
import { content } from "./consts";

export default function RegistrationCarousel() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "4rem",
        alignItems: "center",
      }}
    >
      <div className="registration-carousel">
        <div
          className={`registration-carousel-arrow-left registration-carousel-arrow-left-${
            currentPage === 0 ? "disabled" : "active"
          }`}
          onClick={
            currentPage === 0
              ? () => {
                  return;
                }
              : () => setCurrentPage(currentPage - 1)
          }
        />
        <div className="registration-carousel-card">
          <h1 className="">{content[currentPage].title}</h1>
          <p className="registration-carousel-card-body">
            {content[currentPage].body}
          </p>
        </div>
        <div
          className={`registration-carousel-arrow-right registration-carousel-arrow-right-${
            currentPage === content.length - 1 ? "disabled" : "active"
          }`}
          onClick={
            currentPage === content.length - 1
              ? () => {
                  return;
                }
              : () => setCurrentPage(currentPage + 1)
          }
        />
      </div>
      <div className="registration-pagination">
        {content.map((_, index) => {
          return (
            <div
              className={`registration-pagination-page registration-pagination-page-${
                index === currentPage ? "active" : "not-active"
              }`}
              onClick={
                index === currentPage
                  ? () => {
                      return;
                    }
                  : () => setCurrentPage(index)
              }
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
