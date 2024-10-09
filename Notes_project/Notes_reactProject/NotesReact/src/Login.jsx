import React, { useState } from "react";

import styles from "./styles/loginPage.module.css";
import { useStores } from "../store/root-store-context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login_User } = useStores();

  // Обробник форми
  const handleSubmit = async (event) => {
    event.preventDefault();

    await login_User(email, password);
  };
  return (
    <div className={styles.container}>
      <h2>Авторизація</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Емаїл користувача</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Увійти
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
