"use client";

import {
  backendURL,
  createNoteEndpoint,
  defaultHeaders,
  deleteNote,
  getNotes,
} from "@/exports/appAPIendpoints";
import { nameKey } from "@/exports/cookieKeys";
import { CookieService } from "@/exports/cookieService";
import { createKey } from "@/exports/createKey";
import { indexToLessonType } from "@/exports/indexToLessonType";
import { useQuery } from "@/exports/useQuery";
import { FormEvent, useEffect, useState } from "react";
import crossImage from "@/images/cross.png";
import Image from "next/image";
import { ErrorMessage } from "./ErrorMessage";
import Modal from "./Modal";

type NoteData = {
  title: string;
  lesson: string;
  type: 1 | 2 | 3;
  link: string;
  content: string;
  id: number;
};

export default function NotesPage() {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [currentNotes, setCurrentNotes] = useState<NoteData[]>([]);
  const [numberOfNotesDeletion, setNumberOfNotesDeletion] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();

  const { data, isLoading } = useQuery(
    () => getNotes(CookieService.getValue(nameKey)!),
    [
      "get notes",
      CookieService.getValue(nameKey)!,
      "" + isCreatingNote,
      "" + numberOfNotesDeletion,
    ]
  );

  useEffect(() => {
    if (data) setCurrentNotes(data);
  }, [isLoading]);

  useEffect(() => {
    if (isModalOpened) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpened]);

  async function formSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data: Omit<NoteData, "id"> = {
      title: (target[0] as HTMLInputElement).value,
      lesson: (target[1] as HTMLInputElement).value,
      type: +(target[2] as HTMLSelectElement).value as 1 | 2 | 3,
      link: (target[3] as HTMLInputElement).value,
      content: (target[4] as HTMLTextAreaElement).value,
    };
    if (data.title && data.content && data.lesson && data.type) {
      const res = await fetch(backendURL + createNoteEndpoint.endpoint, {
        method: createNoteEndpoint.method,
        headers: {
          ...defaultHeaders,
        },
        body: JSON.stringify({
          ...data,
          login: CookieService.getValue(nameKey),
        }),
      });
      if (res.ok) {
        const json = await res.json();
      }
      setIsCreatingNote(false);
    }
  }

  function deleteNoteHandler(id: number) {
    setIdToDelete(id);
    setIsModalOpened(true);
  }

  if (!CookieService.getValue(nameKey))
    return <ErrorMessage code={403} message={"Немає доступу"} />;

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
                <Image
                  className={"notes-createNote-form-cross"}
                  src={crossImage}
                  alt={"cross"}
                  onClick={() => setIsCreatingNote(false)}
                />
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Введіть заголовок *"
                  required
                  maxLength={50}
                ></input>
                <input
                  className={"notes-createNote-form-input"}
                  placeholder="Для предмету *"
                  required
                  maxLength={30}
                ></input>
                <select
                  placeholder="Оберіть тип"
                  className={"notes-createNote-form-select"}
                >
                  <option value="" disabled selected>
                    Оберіть тип уроку *
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
                  maxLength={128}
                ></input>
                <textarea
                  className={"notes-createNote-form-textArea"}
                  placeholder="Введіть зміст *"
                  required
                  maxLength={256}
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
        {currentNotes.map((note) => {
          return (
            <div className="notesList-note" key={createKey(16)}>
              <Image
                className="notesList-note-cross"
                src={crossImage}
                alt={"Cross"}
                onClick={() => deleteNoteHandler(note.id)}
              />
              <h3 className="notesList-note-header">
                {note.title}
                <br />
                {note.link ? (
                  <>
                    <a
                      className="notesList-note-link"
                      href={note.link}
                      target="_blank"
                    >
                      {indexToLessonType(note.type)}
                    </a>
                  </>
                ) : (
                  <>{indexToLessonType(note.type)}</>
                )}
                {" по " + note.lesson}
              </h3>
              <p className="notesList-note-content">{note.content}</p>
            </div>
          );
        })}
      </div>
      {isModalOpened ? (
        <Modal
          closeModalHandler={() => setIsModalOpened(false)}
          onSubmitModalHandler={async () => {
            const res = await deleteNote(idToDelete!);
            if (res.ok) setNumberOfNotesDeletion(numberOfNotesDeletion + 1);
          }}
        />
      ) : null}
    </>
  );
}
