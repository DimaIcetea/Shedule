"use client";

import {
  backendURL,
  defaultHeaders,
  loginEndpoint,
} from "@/exports/appAPIendpoints";
import { homeRoute } from "@/exports/appRoutes";
import { CookieService } from "@/exports/cookieService";
import {
  apiKeyKey,
  nameKey,
} from "@/exports/cookieKeys";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

type InputDataType = {
  name: string;
  password: string;
};

type ResponseData = {
  token: string;
  message: string;
};

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (CookieService.getValue(apiKeyKey)) {
      router.push(homeRoute);
    }
  }, []);

  async function loginFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const data: InputDataType = {
      name: (target[0] as HTMLInputElement).value,
      password: (target[1] as HTMLInputElement).value,
    };
    if (data.name && data.password) {
      const res = await fetch(backendURL + loginEndpoint.endpoint, {
        method: loginEndpoint.method,
        headers: {
          ...defaultHeaders,
        },
        body: JSON.stringify({
          login: data.name,
          password: data.password,
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as ResponseData;
        CookieService.setValue(apiKeyKey, json.token);
        CookieService.setValue(nameKey, data.name);
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
          <input
            className="registration-form-content-input"
            type="text"
            required
            placeholder={"Ім'я *"}
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
