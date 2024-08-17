import styles from "./styles/sideBar.module.css"

export default function SideBar() 
{
    return  <div className={styles.sidebar}>
    <ul>
        <li><a href="#">group1</a></li>
        <li><a href="#">group2</a></li>
        <li><a href="#">group3</a></li>
        <li><a href="#">group3</a></li>
        <a className={styles.button_link}>Create Group</a>
    </ul>
</div>
}