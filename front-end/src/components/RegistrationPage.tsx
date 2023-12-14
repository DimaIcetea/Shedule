"use client";

import {
  backendURL,
  defaultHeaders,
  registrationEndpoint,
} from "@/exports/appAPIendpoints";
import { homeRoute } from "@/exports/appRoutes";
import { CookieService } from "@/exports/cookieService";
import { apiKeyKey, nameKey } from "@/exports/cookieKeys";
import {
  vaildationInitState,
  validationReducer,
} from "@/exports/registrationPageReducer";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useReducer, useState } from "react";

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
  secret: string;
};

type ResponseData = {
  token: string;
  message: string;
};

export default function RegistrationPage() {
  const router = useRouter();
  const [isBEError, setIsBEError] = useState(false);
  const [validationStatus, dispatchValidationStatus] = useReducer(
    validationReducer,
    vaildationInitState
  );

    console.log(CookieService.getValue(apiKeyKey))

  useEffect(() => {
    if (CookieService.getValue(apiKeyKey)) {
      router.push(homeRoute);
    }
  }, []);

  async function registrationFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatchValidationStatus({ type: "reset", payload: true });
    setIsBEError(false);
    let isCorrectInput = true;
    const target = e.target as HTMLFormElement;
    const data: InputDataType = {
      name: (target[0] as HTMLInputElement).value,
      email: (target[1] as HTMLInputElement).value,
      password: (target[2] as HTMLInputElement).value,
      doesPasswordMatch:
        (target[2] as HTMLInputElement).value ===
        (target[3] as HTMLInputElement).value,
      secret: (target[4] as HTMLInputElement).value,
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
      const res = await fetch(backendURL + registrationEndpoint.endpoint, {
        method: registrationEndpoint.method,
        headers: {
          ...defaultHeaders,
        },
        body: JSON.stringify({
          login: data.name,
          email: data.email,
          password: data.password,
          secret: data.secret,
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as ResponseData;
        CookieService.setValue(apiKeyKey, json.token);
        CookieService.setValue(nameKey, data.name);
        router.push(homeRoute);
      } else {
        setIsBEError(true);
      }
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
          {isBEError ? (
            <h3 className="registration-form-content-errorText">
              Помилка про обробці даних
            </h3>
          ) : null}
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
          {!validationStatus.passwordMatch ? (
            <h3 className="registration-form-content-errorText">
              Паролі не співпадають
            </h3>
          ) : null}
          {!validationStatus.passwordSecure ? (
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

          <input
            className="registration-form-content-input"
            type="password"
            placeholder={"Код адміністратора"}
          ></input>

          <button className="registration-form-content-button" type="submit">
            Створити акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
