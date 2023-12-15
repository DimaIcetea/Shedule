"use client";

import { indexToDay } from "@/exports/indexToDay";
import { indexToLessonTime } from "@/exports/indexToLessonTime";
import { indexToWord } from "@/exports/indexToWord";

export type ScheduleResponseType = {
  lesson: string;
  teacher: string;
  period: number;
  link: string;
  group: string;
  time: number;
  day: number;
};

export default function ChangeSchedulePage() {
  function formSubmitHandler() {}

  return (
    <div className="notes">
      <div className="notes-createNote">
        <form className={"notes-createNote-form"} onSubmit={formSubmitHandler}>
          <h3 style={{ textAlign: "center" }}>Змінити розпис</h3>
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
            placeholder="Введіть групу *"
            required
          ></input>
          <input
            className={"notes-createNote-form-input"}
            placeholder="Введіть посилання"
            type="url"
          ></input>
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
                    {indexToWord(index + 1 as 1 | 2 | 3 | 4) + " період"}
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
          <button className={"notes-createNote-form-button"} type="submit">
            Додати нову інформацію
          </button>
        </form>
      </div>
    </div>
  );
}
