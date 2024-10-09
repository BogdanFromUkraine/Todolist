import React, { useState } from "react";
import axios from "axios";
import styles from "./styles/registerPage.module.css";
import { useStores } from "../store/root-store-context";
import { observer } from "mobx-react-lite";

export const RegisterPage = observer(() => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register_User } = useStores();

  // Обробник форми реєстрації
  const handleSubmit = async (event) => {
    event.preventDefault();
    await register_User(userName, email, password);

    //очищення форми
    setUsername("");
    setEmail("");
    setPassword("");

    alert("Успішно зареєструвався");
  };

  return (
    <div className={styles.container}>
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Ім'я користувача</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Електронна пошта</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
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
          Зареєструватися
        </button>
      </form>
    </div>
  );
});
