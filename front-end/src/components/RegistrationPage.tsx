"use client";

import { homeRoute } from "@/exports/appRoutes";
import { createKey } from "@/exports/createKey";
import { localStorageAPIKeyKey, localStorageNameKey } from "@/exports/localStorageKeys";
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

const groupRegex = /[А-ЯҐЄІЇ]+[А-ЯҐЄІЇ]+[-]+[0-9]+[0-9]/;

type InputDataType = {
  name: string;
  email: string;
  password: string;
  doesPasswordMatch: boolean;
};

export default function RegistrationPage() {
  const router = useRouter();
  const [validationStatus, dispatchValidationStatus] = useReducer(
    validationReducer,
    vaildationInitState
  );

  useEffect(() => {
    if (localStorage.getItem(localStorageAPIKeyKey)) {
      router.push(homeRoute);
    }
  }, []);

  function registrationFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatchValidationStatus({ type: "reset", payload: true });
    let isCorrectInput = true;
    const data: InputDataType = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      doesPasswordMatch: e.target[2].value === e.target[3].value,
    };
    const nameElements = data.name.split(" ");
    if (!(nameElements.length === 3 && groupRegex.test(nameElements[0]))) {
      dispatchValidationStatus({ type: "name", payload: false });
      isCorrectInput = false;
    }
    if (!emailRegex.test(data.email)) {
      dispatchValidationStatus({ type: "email", payload: false });
      isCorrectInput = false;
    }
    if (!passwordRegex.test(data.password)) {
      dispatchValidationStatus({ type: "passwordSecure", payload: false });
      isCorrectInput = false;
    }
    if (!data.doesPasswordMatch) {
      dispatchValidationStatus({ type: "passwordMatch", payload: false });
      isCorrectInput = false;
    }
    if (isCorrectInput) {
      localStorage.setItem(localStorageAPIKeyKey, createKey(16));
      localStorage.setItem(localStorageNameKey, data.name)
      router.push(homeRoute);
    }
  }

  return (
    <div className="registration">
      <form
        className="registration-form"
        onSubmit={(e) => registrationFormSubmitHandler(e)}
      >
        <h1 className="registration-form-header">Cтворіть акаунт</h1>
        <div className="registration-form-ruler" />
        <div className="registration-form-content">
          {!validationStatus.email ? (
            <h3 className="registration-form-content-errorText">
              Неправильний формат пошти
            </h3>
          ) : null}
          {!validationStatus.name ? (
            <h3 className="registration-form-content-errorText">
              Неправильний формат ім&apos;я
            </h3>
          ) : null}
          {!validationStatus.passwordSecure ? (
            <h3 className="registration-form-content-errorText">
              Паролі не співпадають
            </h3>
          ) : null}
          {!validationStatus.passwordMatch ? (
            <h3 className="registration-form-content-errorText">
              Пароль повинен мати 8 символів, та 1 цифру, букву та спеціальний
              символ
            </h3>
          ) : null}

          <input
            className="registration-form-content-input"
            type="text"
            required
            placeholder={"Група, прізвище та ім'я *"}
          ></input>

          <input
            className="registration-form-content-input"
            type="text"
            required
            placeholder={"Пошта *"}
          ></input>

          <input
            className="registration-form-content-input"
            type="password"
            required
            placeholder={"Пароль *"}
          ></input>

          <input
            className="registration-form-content-input"
            type="password"
            required
            placeholder={"Підтвердіть пароль *"}
          ></input>

          <button className="registration-form-content-button" type="submit">
            Створити акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
