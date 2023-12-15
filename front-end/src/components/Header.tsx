"use client";

import Image from "next/image";
import logo from "../images/logo.gif";
import profilePicture from "../images/profile.png";
import logoutPicture from "../images/logout.png";
import { apiKeyKey, isAdminKey, nameKey } from "@/exports/cookieKeys";
import {
  changeScheduleRoute,
  homeRoute,
  loginRoute,
  notesRoute,
  registerRoute,
} from "@/exports/appRoutes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CookieService } from "@/exports/cookieService";

export default function Header() {
  const pathName = usePathname();

  let apiKey: string | undefined = "";
  if (typeof window !== "undefined") {
    apiKey = CookieService.getValue(apiKeyKey);
  }

  function logoutHandler() {
    CookieService.clear();
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

  return (
    <header className="header">
      <div className="header-title">
        <Link className="header-title-link" href={homeRoute}>
          <Image
            className="header-title-link-image"
            src={logo}
            width={75}
            height={75}
            alt="Логотип КПІ"
          />
          <h1 className="header-title-link-heading">Розклад занять</h1>
        </Link>
      </div>
      <div className="header-notes">
        {apiKey ? (
          <>
            {CookieService.getValue(isAdminKey) === "true" ? (
              <h3 className="header-notes-text">
                <Link href={changeScheduleRoute}>Редагувати розклад</Link>
              </h3>
            ) : null}
            <h3 className="header-notes-text">
              <Link href={notesRoute}>Переглянути нотатки</Link>
            </h3>
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
              <h3 className="header-auth-name-text">
                {CookieService.getValue(nameKey)}
              </h3>
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
