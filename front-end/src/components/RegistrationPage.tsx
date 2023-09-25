"use client";

import { localStorageAPIKeyKey } from "@/exports/localStorageKeys";
import {
  vaildationInitState,
  validationReducer,
} from "@/exports/registrationPageReducer";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useReducer } from "react";

const emailRegex =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// Minimum eight characters, at least one letter, one number and one special character
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const groupRegex = /[A-Z]+[A-Z]+[-]+[0-9]+[0-9]/;

export default function RegistrationPage() {
  const router = useRouter();
  const validationStatus = useReducer(validationReducer, vaildationInitState);

  useEffect(() => {
    if (localStorage.getItem(localStorageAPIKeyKey)) {
      router.push("/");
    }
  }, []);

  function registrationFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: {
      name: string,
      email: string,
      password: string,
      doesPasswordMatch: boolean
    } = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      doesPasswordMatch: e.target[2].value === e.target[3].value,
    };
    const nameElements = data.name.split(" ")
    if (nameElements.length === 3 && groupRegex.test(nameElements[0])){
      console.log("Verified!")
    }

  }

  return (
    <div className="registration">
      <form
        className="registration-form"
        onSubmit={(e) => registrationFormSubmitHandler(e)}
      >
        <h1 className="registration-form-header">Cтворіть акаунт</h1>
        <div className="registration-form-content">
          <label className="registration-form-content-label">
            Група, прізвище та ім&#39;я{" "}
            <span style={{ color: "red", fontSize: "inherit" }}>*</span>
          </label>
          <input
            className="registration-form-content-input"
            type="text"
            required
          ></input>

          <label className="registration-form-content-label">
            Пошта <span style={{ color: "red", fontSize: "inherit" }}>*</span>
          </label>
          <input
            className="registration-form-content-input"
            type="text"
            required
          ></input>

          <label className="registration-form-content-label">
            Пароль <span style={{ color: "red", fontSize: "inherit" }}>*</span>
          </label>
          <input
            className="registration-form-content-input"
            type="password"
            required
          ></input>

          <label className="registration-form-content-label">
            Підтвердіть пароль{" "}
            <span style={{ color: "red", fontSize: "inherit" }}>*</span>
          </label>
          <input
            className="registration-form-content-input"
            type="password"
            required
          ></input>

          <button className="registration-form-content-button" type="submit">
            Створити акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
