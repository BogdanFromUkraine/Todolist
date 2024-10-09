import { observer } from "mobx-react-lite";
import { useStores } from "../store/root-store-context";
import { useEffect } from "react";

export const AddPeopleToGroup = observer(({ groupId }) => {
  const {
    get_AllUsers,
    users,
    add_User_To_Group,
    get_Group_Data,
    groupData,
    remove_User_From_Group,
  } = useStores();

  useEffect(() => {
    const getUsers = async () => {
      await get_AllUsers();
      groupId != null
        ? await get_Group_Data(groupId)
        : console.log("Choose group");
    };
    getUsers();
  }, [groupId]);

  async function selectUser() {
    const select = document.getElementById("user-select");
    const selectedValue = select.value;
    return selectedValue;
  }
  async function addUser() {
    const res = await selectUser();
    await add_User_To_Group(groupId, res);
  }

  async function deleteUser() {
    const res = await selectUser();
    await remove_User_From_Group(groupId, res);
  }

  return (
    <div>
      <select id="user-select" onChange={selectUser}>
        {users.map((i) => {
          return <option value={i.id}>{i.userName}</option>;
        })}
      </select>
      <button onClick={addUser}>Add User to Group</button>
      <button onClick={deleteUser}>Delete User from Group</button>
      {groupData.users != null ? (
        <div>
          Number of Notes: {groupData.numberOfNotes}
          Users of Group:
          <select id="users-group">
            {groupData.users.map((i) => {
              return <option>{i}</option>;
            })}
          </select>
        </div>
      ) : (
        <div>Помилка</div>
      )}
    </div>
  );
});
