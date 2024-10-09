import { observer } from "mobx-react-lite";
import { useStores } from "../store/root-store-context";
import styles from "./styles/sideBar.module.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const SideBar = observer(({ setGroupId }) => {
  const [userGroups, setUserGroups] = useState([]);
  const [isAdmin, setIsAdmin] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const {
    groups,
    get_Notes_From_Group,
    get_User_Data,
    get_All_Group,
    user,
    groupData,
    userRole,
  } = useStores();

  useEffect(() => {
    async function getUserData() {
      await get_User_Data();
      await get_All_Group();
      const token = localStorage.getItem("token");

      //перевіряю чи юсер адмін
      const roles = jwtDecode(token) || [];
      setIsAdmin(roles.role);
      console.log(isAdmin);

      //получаю групи юсера
      const groupsOfUser = jwtDecode(token) || [];
      // console.log(groupsOfUser.group);
      // setUserGroups(groupsOfUser.group);

      var userIsGroups =
        roles.role === "Admin"
          ? groups // Адмін бачить всі елементи
          : groups.filter((item) =>
              groupsOfUser.group.map(Number).includes(item.groupId),
            ); // Фільтрація по groupId
      console.log(userIsGroups);
      setFilteredItems(userIsGroups);
      // console.log(filteredItems);
    }
    getUserData();
  }, []);

  async function handleClick(id) {
    await get_Notes_From_Group(id);
    setGroupId(id);
    console.log(user.userName);
    console.log(groupData.users);
  }

  return (
    <div className={styles.sidebar}>
      <ul>
        {filteredItems.length !== 0 ? (
          filteredItems.map((i) => {
            return (
              <li>
                <a onClick={() => handleClick(i.groupId)} key={i.id} href="#">
                  {i.name}
                </a>
              </li>
            );
          })
        ) : (
          <div>Hold on a minute, please</div>
        )}
        <a className={styles.button_link}>Create Group</a>
      </ul>
    </div>
  );
});
