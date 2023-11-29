"use client";

import { homeRoute } from "@/exports/appRoutes";
import { createKey } from "@/exports/createKey";
import { localStorageAPIKeyKey, localStorageNameKey } from "@/exports/localStorageKeys";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";

type InputDataType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem(localStorageAPIKeyKey)) {
      router.push(homeRoute);
    }
  }, []);

  function loginFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: InputDataType = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    if (data.email && data.password) {
      localStorage.setItem(localStorageAPIKeyKey, createKey(16));
      localStorage.setItem(localStorageNameKey, data.email)
      router.push(homeRoute);
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
            placeholder={"Пошта"}
          ></input>

          <input
            className="registration-form-content-input"
            type="password"
            required
            placeholder={"Пароль"}
          ></input>

          <button className="registration-form-content-button" type="submit">
            Ввійти в акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
