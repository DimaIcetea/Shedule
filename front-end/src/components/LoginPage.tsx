"use client";

import {
  backendURL,
  defaultHeaders,
  loginEndpoint,
} from "@/exports/appAPIendpoints";
import { homeRoute } from "@/exports/appRoutes";
import { CookieService } from "@/exports/cookieService";
import { apiKeyKey, isAdminKey, nameKey } from "@/exports/cookieKeys";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

type InputDataType = {
  email: string;
  password: string;
};

type ResponseData = {
  token: string;
  message: string;
  login: string;
  admin: boolean;
};

export default function LoginPage() {
  const router = useRouter();

  const [isBEError, setIsBEError] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    if (CookieService.getValue(apiKeyKey)) {
      router.push(homeRoute);
    }
  }, []);

  async function loginFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsBEError(false);
    setCustomMessage("");
    const target = e.target as HTMLFormElement;
    const data: InputDataType = {
      email: (target[0] as HTMLInputElement).value,
      password: (target[1] as HTMLInputElement).value,
    };
    if (data.email && data.password) {
      const res = await fetch(backendURL + loginEndpoint.endpoint, {
        method: loginEndpoint.method,
        headers: {
          ...defaultHeaders,
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (res.status === 401) {
        setCustomMessage("Користувач не знайдений")
      }
      if (res.ok) {
        const json = (await res.json()) as ResponseData;
        CookieService.setValue(isAdminKey, "" + json.admin);
        CookieService.setValue(apiKeyKey, json.token);
        CookieService.setValue(nameKey, json.login);
        router.push(homeRoute);
      }
    }
  }

  return (
    <div className="registration">
      <form
        className="registration-form"
        onSubmit={(e) => loginFormSubmitHandler(e)}
      >
        <h1 className="registration-form-header">Ввійдіть в акаунт</h1>
        <div className="registration-form-ruler" />
        <div className="registration-form-content">
          {isBEError ? (
            <h3 className="registration-form-content-errorText">
              Помилка про обробці даних
            </h3>
          ) : null}

          {customMessage !== "" ? (
            <h3 className="registration-form-content-errorText">
              {customMessage}
            </h3>
          ) : null}

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

          <button className="registration-form-content-button" type="submit">
            Ввійти в акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
