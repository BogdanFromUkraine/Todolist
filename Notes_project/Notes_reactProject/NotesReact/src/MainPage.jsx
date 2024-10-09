import "./styles/App.css";
import { Cards } from "./Cards";
import { CreateNotePage } from "./CreateNotePage";
import styles from "./styles/main.module.css";

export default function MainPage({ notess }) {
  return (
    <main className={styles}>
      <div className={styles.createNotePage}>
        <CreateNotePage />
      </div>
      <div className={styles.card}>
        <Cards notes={notess} />
      </div>
    </main>
  );
}
