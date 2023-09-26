import logo from "../../images/logo.gif";
import profilePicture from "../../images/profile.png";
import { localStorageAPIKeyKey } from "../../exports/localStorageKeys";
import { loginRoute, registerRoute } from "../../exports/appRoutes";
import { NavLink, Outlet } from "react-router-dom";

export default function Header() {
  const apiKey = localStorage.getItem(localStorageAPIKeyKey);

  return (
    <>
      <header className="header">
        <div className="header-title">
          <img
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
              <img
                className="header-auth-image"
                src={profilePicture}
                width={60}
                height={60}
                alt="Профіль користувача"
              />
              <div className="header-auth-name">
                <h3 className="header-auth-name-text">Шиян Кіріл ПО-21</h3>
              </div>
            </>
          ) : (
            <>
              <NavLink
                className={(state) =>
                  `header-auth-button header-auth-button-${
                    state.isActive ? "active" : "not-active"
                  }`
                }
                to={registerRoute}
              >
                <h3 className="header-auth-name-text">Зареєструватись</h3>
              </NavLink>
              <div className="header-auth-spacing" />
              <NavLink
                className={(state) =>
                  `header-auth-button header-auth-button-${
                    state.isActive ? "active" : "not-active"
                  }`
                }
                to={loginRoute}
              >
                <h3 className="header-auth-name-text">Увійти</h3>
              </NavLink>
            </>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
