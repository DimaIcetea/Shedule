"use client";

import { createKey } from "@/exports/createKey";
import { indexToDay } from "@/exports/indexToDay";
import { useEffect, useState } from "react";
import groupsJSON from "../content/groups.json";
import { indexToLessonTime } from "@/exports/indexToLessonTime";
import { useQuery } from "@/exports/useQuery";
import { ScheduleResponseType, getSchedule } from "@/exports/appAPIendpoints";
import { indexToWord } from "@/exports/indexToWord";
import { transformScheduleData } from "@/exports/transformScheduleData";

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [periods, setPeriods] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<string>("АА-31");
  const [transformedData, setTransformedData] =
    useState<ScheduleResponseType[][][]>();

  const { data, isLoading } = useQuery(
    () => getSchedule(selectedGroup.split(" ")[0]),
    [selectedGroup]
  );

  useEffect(() => {
    if (data) {
      const { array: newData, numberOfPeriods } = transformScheduleData(data);
      setPeriods(numberOfPeriods);
      setTransformedData(newData);
    }
  }, [isLoading]);

  return (
    <>
      <div className="groupSelector">
        <div className="groupSelector-content">
          <h3 className="groupSelector-content-text">Показати розклад для</h3>
          <select
            className="groupSelector-content-select"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
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
          {Array(periods).fill(1).length !== 0 ? (
            Array(periods)
              .fill(1)
              .map((_, index) => (
                <div
                  key={index}
                  className={`contentSwitcher-content-option ${
                    currentTab === index
                      ? "contentSwitcher-content-option-active"
                      : ""
                  }`}
                  onClick={() => setCurrentTab(index)}
                >
                  <h3 className="contentSwitcher-content-option-text">
                    {indexToWord((index + 1) as 1 | 2 | 3 | 4) + " тиждень"}
                  </h3>
                </div>
              ))
          ) : (
            <div className={`contentSwitcher-content-noData`}>
              <h3 className="contentSwitcher-content-noData-text">
                Немає даних
              </h3>
            </div>
          )}
        </div>
      </div>
      <div className="schedule">
        {Array(periods).fill(1).length !== 0
          ? Array(periods)
              .fill(1)
              .map((_, index) => {
                return currentTab === index ? (
                  <div className="schedule-sub">
                    <div className="schedule-sub-body">
                      {transformedData![currentTab].map((data, index) => (
                        <div
                          key={createKey(16)}
                          className="schedule-sub-body-cell"
                        >
                          <p className="schedule-sub-body-cell-headerText">
                            {indexToDay(index)}
                          </p>
                          {data.map((d, i) => (
                            <div
                              className="schedule-sub-body-cell-data"
                              key={createKey(16)}
                            >
                              <p className="schedule-sub-body-cell-data-mainText">
                                <a
                                  className={`${
                                    d.link
                                      ? "schedule-sub-body-cell-text-hyperlink"
                                      : d.lesson
                                      ? ""
                                      : "schedule-sub-body-cell-text-disabled"
                                  }`}
                                  href={d.link !== "" ? d.link : undefined}
                                  target="_blank"
                                >
                                  {indexToLessonTime(i) +
                                    " " +
                                    (d.lesson !== "" ? d.lesson : "Немає пари")}
                                </a>
                              </p>
                              <p className="schedule-sub-body-cell-data-subText">
                                {d.teacher}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })
          : null}
      </div>
    </>
  );
}
