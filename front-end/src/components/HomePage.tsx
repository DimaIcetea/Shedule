"use client";

import { createKey } from "@/exports/createKey";
import { numberToDayUA } from "@/exports/numberToDay";
import { useState } from "react";

export default function HomePage() {
  const [isCurrentTabFirst, setIsCurrentTabFirst] = useState(true);

  return (
    <>
      <div className="contentSwitcher">
        <div className="contentSwitcher-content">
          <div className={`contentSwitcher-content-option ${isCurrentTabFirst ? "contentSwitcher-content-option-active" : ""}`} onClick={() => setIsCurrentTabFirst(true)}>
            <h3 className="contentSwitcher-content-option-text">
              Перший тиждень
            </h3>
          </div>
          <div className={`contentSwitcher-content-option ${!isCurrentTabFirst ? "contentSwitcher-content-option-active" : ""}`} onClick={() => setIsCurrentTabFirst(false)}>
            <h3 className="contentSwitcher-content-option-text">
              Другий тиждень
            </h3>
          </div>
        </div>
      </div>
      <div className="schedule">
        {isCurrentTabFirst ? (
          <div className="schedule-sub">
            <div className="schedule-sub-body">
              {Array(6)
                .fill(1)
                .map((_, index) => (
                  <div key={createKey(16)} className="schedule-sub-body-cell">
                    <p className="schedule-sub-body-cell-text">
                      {numberToDayUA(index)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="schedule-sub">
            <div className="schedule-sub-body">
              {Array(6)
                .fill(1)
                .map((_, index) => (
                  <div key={createKey(16)} className="schedule-sub-body-cell">
                    <p className="schedule-sub-body-cell-text">
                      {numberToDayUA(index)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
