import styles from "./styles/navbar.module.css"

export default function Navbar() 
{
    return  <nav class={styles.navbar}>
    <div class={styles.logo}>
        <a href="#">MySite</a>
    </div>
    <ul class={styles.nav_links}>
        <li><a href="#">????</a></li>
        <li><a href="#">Create Group</a></li>
        <li><a href="#">Group</a></li>
        <li><a href="#">User</a></li>
    </ul>
</nav>
}