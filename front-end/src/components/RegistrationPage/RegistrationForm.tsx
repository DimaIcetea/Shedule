import { localStorageAPIKeyKey } from "../../exports/localStorageKeys";
import {
  vaildationInitState,
  validationReducer,
} from "../../exports/registrationPageReducer";
import { objectHasValue, sleep } from "../../exports/utils";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useReducer } from "react";
import visibilityIcon from "../../images/visibility.png";

type UserInputDataType = {
  name: string;
  email: string;
  password: string;
};

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

// Minimum eight characters, at least one letter, one number and one special character
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const groupRegex = /^[А-ЯҐЄІЇ]{2}-[0-9]{2}$/;

export default function RegistrationForm() {
  const [validationStatus, validationStatusDispatch] = useReducer(
    validationReducer,
    { ...vaildationInitState }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(localStorageAPIKeyKey)) {
      navigate("/");
    }
  }, []);

  function registrationFormSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validationStatusDispatch({ type: "reset", payload: true });

    const data: UserInputDataType = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };

    const nameElements = data.name.split(" ");

    if (!(nameElements.length === 3 && groupRegex.test(nameElements[0]))) {
      validationStatusDispatch({ type: "name", payload: false });
    }

    if (!passwordRegex.test(data.password)) {
      validationStatusDispatch({ type: "passwordSecure", payload: false });
    }

    if (!emailRegex.test(data.email)) {
      validationStatusDispatch({ type: "email", payload: false });
    }

    if (e.target[2].value !== e.target[3].value) {
      validationStatusDispatch({ type: "passwordMatch", payload: false });
    }

    sleep(50);

    if (!objectHasValue(validationStatus, false)) {
      console.log("Validated");
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
          {objectHasValue(validationStatus, false) ? (
            <div className="registration-form-content-error">
              {!validationStatus.name ? (
                <p>Ім'я повинно бути формату Група Прізвище Ім'я</p>
              ) : null}

              {!validationStatus.email ? (
                <p className="registration-form-content-error-body">
                  Неправильний формат пошти
                </p>
              ) : null}

              {!validationStatus.passwordSecure ? (
                <p className="registration-form-content-error-body">
                  Пароль повинен мати більше 8 символів та 1 літеру і цифру
                </p>
              ) : null}

              {!validationStatus.passwordMatch ? (
                <p className="registration-form-content-error-body">
                  Паролі не збігаються
                </p>
              ) : null}
            </div>
          ) : null}
          <input
            className="registration-form-content-input"
            type="text"
            required
            placeholder={"Група, прізвище та ім'я"}
          />

          <input
            className="registration-form-content-input"
            type="text"
            required
            placeholder={"Пошта"}
          />

          <input
            className="registration-form-content-input"
            type="password"
            required
            placeholder={"Пароль"}
          />

          <input
            className="registration-form-content-input"
            type="password"
            required
            placeholder={"Підтвердіть пароль"}
          />

          <div className="registration-form-content-checkbox">
            <input type="checkbox" />
            <p className="registration-form-content-checkbox-text">
              Something Something Saber
            </p>
          </div>

          <button className="registration-form-content-button" type="submit">
            Створити акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
