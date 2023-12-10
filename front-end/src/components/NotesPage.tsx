"use client";

import { createKey } from "@/exports/createKey";
import { FormEvent, useState } from "react";

type NoteData = {
  title: string;
  link: string;
  content: string;
};

export default function NotesPage() {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [currentNotes, setCurrentNotes] = useState<NoteData[]>([]);

  function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: NoteData = {
      title: e.target[0].value,
      link: e.target[1].value,
      content: e.target[2].value,
    };
    if (data.title && data.content) {
      setCurrentNotes((prevValue) => {
        const prev = [...prevValue];
        prev.push(data);
        return prev;
      });
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
