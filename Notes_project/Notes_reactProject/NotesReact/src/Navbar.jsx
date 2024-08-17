import styles from "./styles/navbar.module.css"
import { Link } from "react-router-dom"

export default function Navbar() 
{
    return  <nav className={styles.navbar}>
    <div className={styles.logo}>
        <Link to="/">Todolist</Link>
    </div>
    <ul className={styles.nav_links}>
        <li><Link to="/People">People</Link></li>
        <li><Link to="#">Create Group</Link></li>
        <li><Link to="/Group">Group</Link></li>
        <li><Link to="/User">User</Link></li>
    </ul>
</nav>
}