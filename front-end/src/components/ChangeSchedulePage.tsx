"use client";

import { apiKeyKey, isAdminKey, nameKey } from "@/exports/cookieKeys";
import { CookieService } from "@/exports/cookieService";
import { indexToDay } from "@/exports/indexToDay";
import { indexToLessonTime } from "@/exports/indexToLessonTime";
import { indexToWord } from "@/exports/indexToWord";
import { ErrorMessage } from "./ErrorMessage";
import {
  ScheduleResponseType,
  deleteSchedule,
  patchSchedule,
} from "@/exports/appAPIendpoints";
import { FormEvent, useState } from "react";

export type asdada = {
  lesson: string;
  teacher: string;
  link: string;
  group: string;
  period: number;
  day: number;
  time: number;
};

const switcherText = [
  "Змінити інформацію про пару",
  "Видалити інформацію про пару",
];

enum MessageColors {
  green = "#04AF70",
  red = "#FF0000",
}

type MessageType = {
  message: string;
  color: MessageColors;
};

const defaultMessageValue: MessageType = {
  message: "",
  color: MessageColors.green,
};

export default function ChangeSchedulePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [message, setMessage] = useState<MessageType>({
    ...defaultMessageValue,
  });

  if (localStorage.getItem(isAdminKey) !== "true")
    return <ErrorMessage code={403} message={"Немає доступу"} />;

  async function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage({ ...defaultMessageValue });
    const target = e.target as HTMLFormElement;
    const params = {
      period: +(target[0] as HTMLSelectElement).value,
      day: +(target[1] as HTMLSelectElement).value,
      time: +(target[2] as HTMLSelectElement).value,
    };
    if (currentTab === 0) {
      const data: ScheduleResponseType = {
        lesson: (target[3] as HTMLInputElement).value,
        teacher: (target[4] as HTMLInputElement).value,
        link: (target[5] as HTMLInputElement).value,
        group: localStorage.getItem(nameKey)?.split(" ")[0] || "", 
        ...params,
      };
      const res = await patchSchedule(
        params,
        localStorage.getItem(apiKeyKey)!,
        data
      );
      if (res.ok)
        setMessage({ message: "Розклад змінено", color: MessageColors.green });
      else setMessage({ message: "Сталась помилка", color: MessageColors.red });
    } else {
      const res = await deleteSchedule(
        params,
        localStorage.getItem(apiKeyKey)!
      );
      if (res.ok)
        setMessage({
          message: "Інформацію видалено",
          color: MessageColors.green,
        });
      else setMessage({ message: "Сталась помилка", color: MessageColors.red });
    }
  }

  return (
    <>
      <div className="contentSwitcher">
        <div className="contentSwitcher-content">
          {switcherText.map((text, index) => (
            <div
              key={index}
              className={`contentSwitcher-content-option ${
                currentTab === index
                  ? "contentSwitcher-content-option-active"
                  : ""
              }`}
              onClick={() => {
                setMessage({ ...defaultMessageValue });
                setCurrentTab(index);
              }}
            >
              <h3 className="contentSwitcher-content-option-text">{text}</h3>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="notes">
        <div className="notes-createNote">
          <div>
            {message.message ? (
              <h3 style={{ color: message.color }}>{message.message}</h3>
            ) : null}
          </div>
          <form
            className={"notes-createNote-form"}
            onSubmit={formSubmitHandler}
          >
            <select
              placeholder="Введіть період"
              className={"notes-createNote-form-select"}
            >
              <option value="" disabled selected>
                Оберіть період
              </option>
              {Array(4)
                .fill(1)
                .map((_, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {indexToWord((index + 1) as 1 | 2 | 3 | 4) + " період"}
                    </option>
                  );
                })}
            </select>
            <select
              placeholder="Введіть день"
              className={"notes-createNote-form-select"}
            >
              <option value="" disabled selected>
                Оберіть день
              </option>
              {Array(6)
                .fill(1)
                .map((_, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {indexToDay(index)}
                    </option>
                  );
                })}
            </select>
            <select
              placeholder="Введіть час"
              className={"notes-createNote-form-select"}
            >
              <option value="" disabled selected>
                Оберіть час
              </option>
              {Array(6)
                .fill(1)
                .map((_, index) => {
                  return (
                    <option value={index + 1} key={index}>
                      {indexToLessonTime(index)}
                    </option>
                  );
                })}
            </select>
            {currentTab === 0 ? (
              <>
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Введіть назву урока *"
                  required
                ></input>
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Введіть ім'я вчителя *"
                  required
                ></input>
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Введіть посилання"
                  type="url"
                ></input>
              </>
            ) : null}
            <button className={"notes-createNote-form-button"} type="submit">
              {currentTab === 0 ? "Змінити інформацію" : "Видалити інформацію"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
