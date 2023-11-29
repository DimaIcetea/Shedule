"use client";

import Image from "next/image";
import logo from "../images/logo.gif";
import profilePicture from "../images/profile.png";
import logoutPicture from "../images/logout.png";
import {
  localStorageAPIKeyKey,
  localStorageNameKey,
} from "@/exports/localStorageKeys";
import { loginRoute, registerRoute } from "@/exports/appRoutes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  
  let apiKey: string | null = "";
  let userName: string | null = "";
  if (typeof window !== "undefined") {
    apiKey = window.localStorage.getItem(localStorageAPIKeyKey);
    userName = window.localStorage.getItem(localStorageNameKey);
  }

  function logoutHandler() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <header className="header">
      <div className="header-title">
        <Image
          className="header-title-image"
          src={logo}
          width={75}
          height={75}
          alt="Логотип КПІ"
        />
        <h1 className="header-title-heading">Розклад занять</h1>
      </div>
      <div className="header-notes">
        {apiKey ? (
          <>
            <h3 className="header-notes-text">Створити нотатку</h3>
            <h3 className="header-notes-text">Переглянути нотатки</h3>
          </>
        ) : null}
      </div>
      <div className="header-auth">
        {apiKey ? (
          <>
            <Image
              className="header-auth-image header-auth-image-button"
              src={logoutPicture}
              width={45}
              height={45}
              alt="Вийти з профілю користувача"
              onClick={logoutHandler}
            />
            <Image
              className="header-auth-image"
              src={profilePicture}
              width={60}
              height={60}
              alt="Профіль користувача"
            />
            <div className="header-auth-name">
              <h3 className="header-auth-name-text">{userName}</h3>
            </div>
          </>
        ) : (
          <>
            <Link
              className={`header-auth-button header-auth-button-${
                pathName === registerRoute ? "active" : "not-active"
              }`}
              href={registerRoute}
            >
              <h3 className="header-auth-name-text">Зареєструватись</h3>
            </Link>
            <div className="header-auth-spacing" />
            <Link
              className={`header-auth-button header-auth-button-${
                pathName === loginRoute ? "active" : "not-active"
              }`}
              href={loginRoute}
            >
              <h3 className="header-auth-name-text">Увійти</h3>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
