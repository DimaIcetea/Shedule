"use client";

import {
  backendURL,
  createNoteEndpoint,
  defaultHeaders,
  getNotes,
} from "@/exports/appAPIendpoints";
import { createKey } from "@/exports/createKey";
import { indexToLessonType } from "@/exports/indexToLessonType";
import { useQuery } from "@/exports/useQuery";
import { FormEvent, useEffect, useState } from "react";

type NoteData = {
  title: string;
  lesson: string;
  type: 1 | 2 | 3;
  link: string;
  content: string;
};

export default function NotesPage() {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [currentNotes, setCurrentNotes] = useState<NoteData[]>([]);

  const { data } = useQuery(() => getNotes(1), ["get notes", 1]);

  console.log(data);

  async function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data: NoteData = {
      title: (target[0] as HTMLInputElement).value,
      lesson: (target[1] as HTMLInputElement).value,
      type: +(target[2] as HTMLSelectElement).value as 1 | 2 | 3,
      link: (target[3] as HTMLInputElement).value,
      content: (target[4] as HTMLTextAreaElement).value,
    };
    if (data.title && data.content && data.lesson && data.type) {
      console.log(data);
      const res = await fetch(backendURL + createNoteEndpoint.endpoint, {
        method: createNoteEndpoint.method,
        headers: {
          ...defaultHeaders,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      }
      setIsCreatingNote(false);
    }
  }

  return (
    <>
      <div className="notes">
        <div>
          <div className="notes-createNote">
            {!isCreatingNote ? (
              <h3
                className="notes-createNote-button"
                onClick={() => setIsCreatingNote(true)}
              >
                Створити нотатку
              </h3>
            ) : (
              <form
                className={"notes-createNote-form"}
                onSubmit={formSubmitHandler}
              >
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Введіть заголовок *"
                  required
                ></input>
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Для предмету *"
                  required
                ></input>
                <select
                  placeholder="Оберіть тип"
                  className={"notes-createNote-form-select"}
                >
                  <option value="" disabled selected>
                    Оберіть тип уроку
                  </option>
                  {[1, 2, 3].map((val) => {
                    return (
                      <option value={val} key={val}>
                        {indexToLessonType(val as 1 | 2 | 3)}
                      </option>
                    );
                  })}
                </select>
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Додадіть посилання"
                  type="url"
                ></input>
                <textarea
                  className={"notes-createNote-form-textArea"}
                  placeholder="Введіть зміст *"
                  required
                ></textarea>
                <button
                  className={"notes-createNote-form-button"}
                  type="submit"
                >
                  Створити нотатку
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="notesList">
        {currentNotes.map((note) => (
          <div className="notesList-note" key={createKey(16)}>
            <h3 className="notesList-note-header">
              {note.title}{" "}
              {note.link ? (
                <a
                  className="notesList-note-link"
                  href={note.link}
                  target="_blank"
                >
                  Посилання
                </a>
              ) : null}
            </h3>
            <p className="notesList-note-content">{note.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}
