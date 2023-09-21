import Image from "next/image";
import logo from "../images/logo.gif";
import profilePicture from "../images/profile.png";

export default function Header() {
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
        <h3 className="header-notes-text">Створити нотатку</h3>
        <h3 className="header-notes-text">Переглянути нотатки</h3>
      </div>
      <div className="header-auth">
        <Image
          className="header-auth-image"
          src={profilePicture}
          width={60}
          height={60}
          alt="Профіль користувача"
        />
        <div className="header-auth-name">
          <h3 className="header-auth-name-text">Шиян Кіріл ПО-21</h3>
        </div>
      </div>
    </header>
  );
}
