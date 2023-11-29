"use client";

import { createKey } from "@/exports/createKey";
import { numberToDayUA } from "@/exports/numberToDay";
import { useState } from "react";
import groupsJSON from "../content/groups.json";
import dummyScheduleData from "../content/dummySchedule.json";

export default function HomePage() {
  const [isCurrentTabFirst, setIsCurrentTabFirst] = useState(true);

  return (
    <>
      <div className="groupSelector">
        <div className="groupSelector-content">
          <h3 className="groupSelector-content-text">Показати розклад для</h3>
          <select
            className="groupSelector-content-select"
            onChange={(e) => console.log(e.target.value)}
          >
            {groupsJSON.groups.map((group) => (
              <option key={createKey(16)} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="contentSwitcher">
        <div className="contentSwitcher-content">
          <div
            className={`contentSwitcher-content-option ${
              isCurrentTabFirst ? "contentSwitcher-content-option-active" : ""
            }`}
            onClick={() => setIsCurrentTabFirst(true)}
          >
            <h3 className="contentSwitcher-content-option-text">
              Перший тиждень
            </h3>
          </div>
          <div
            className={`contentSwitcher-content-option ${
              !isCurrentTabFirst ? "contentSwitcher-content-option-active" : ""
            }`}
            onClick={() => setIsCurrentTabFirst(false)}
          >
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
              {dummyScheduleData.weekOne.map((data, index) => (
                <div key={createKey(16)} className="schedule-sub-body-cell">
                  <p className="schedule-sub-body-cell-headerText">
                    {numberToDayUA(index)}
                  </p>
                  {data.map((d) => (
                    <p
                      className="schedule-sub-body-cell-text"
                      key={createKey(16)}
                    >
                      {d}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="schedule-sub">
            <div className="schedule-sub-body">
              {dummyScheduleData.weekTwo.map((data, index) => (
                <div key={createKey(16)} className="schedule-sub-body-cell">
                  <p className="schedule-sub-body-cell-headerText">
                    {numberToDayUA(index)}
                  </p>
                  {data.map((d) => (
                    <p
                      className="schedule-sub-body-cell-text"
                      key={createKey(16)}
                    >
                      {data}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
