import React from "react";
import { useState } from "react";
import loginService from "../services/login";

const initialState = {
  username: "",
  password: "",
};
export default function LoginForm({ setUser, setNotif, initialNotif }) {
  const [loginState, setLoginState] = useState(initialState);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(loginState);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setLoginState(initialState);
    } catch (exception) {
      setNotif({ message: "wrong credentials" });
      setTimeout(() => {
        setNotif(initialNotif);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="login-username">username</label>
        <input
          id="login-username"
          type="text"
          value={loginState.username}
          name="Username"
          onChange={({ target }) =>
            setLoginState({ ...loginState, username: target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="login-password">password</label>
        <input
          id="login-password"
          type="password"
          value={loginState.password}
          name="Password"
          onChange={({ target }) =>
            setLoginState({ ...loginState, password: target.value })
          }
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
}
