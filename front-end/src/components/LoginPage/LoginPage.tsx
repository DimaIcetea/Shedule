type LoginDataType = {
  email: string;
  password: string;
};

export default function LoginPage() {
  function loginFormSubmitHander(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: LoginDataType = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    console.log(data);
  }

  return (
    <div className="registration">
      <form
        className="registration-form"
        onSubmit={(e) => loginFormSubmitHander(e)}
      >
        <h1 className="registration-form-header">Увійдіть в акаунт</h1>
        <div className="registration-form-ruler" />
        <div className="registration-form-content">
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

          <button className="registration-form-content-button" type="submit">
            Увійти в акаунт!
          </button>
        </div>
      </form>
    </div>
  );
}
