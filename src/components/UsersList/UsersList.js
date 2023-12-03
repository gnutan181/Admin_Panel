import PropTypes from "prop-types";
import { useRef,useEffect } from "react";
import {config} from "../../constants";
import styles from "./UsersList.module.css";

const UsersList = (props) => {
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectOne,
    selectAllRef,
    setPage,
    page,
  } = props;
  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);
  let fillRows = [];
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  if (users.length === 0 && page === 1) {
    return <div>NO USERS IN THE SYSTEM</div>;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              ref={selectAllRef}
              onChange={(e) => {
                selectAll(e);
              }}
              name="selectAll"
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return user.show ? (
            <tr key={user.id} className={user.selected ? styles.selected : ""}>
            <td>
              <label for={`check-${user.id}`}>
                <input
                  id={`check-${user.id}`}
                  type="checkbox"
                  data={`${user.selected}`}
                  onChange={() => selectOne(user.id)}
                  checked={user.selected}
                ></input>
              </label>
            </td>
            <td>
              <input
                className={user.edit ? styles.editable : styles.readOnly}
                readOnly={!user.edit}
                type="text"
                ref={nameRef}
                name="name"
                defaultValue={user.name}
              ></input>
            </td>
            <td>
              <input
                className={user.edit ? styles.editable : styles.readOnly}
                readOnly={!user.edit}
                type="email"
                ref={emailRef}
                name="email"
                defaultValue={user.email}
              />
            </td>
            <td>
              <input
                className={user.edit ? styles.editable : styles.readOnly}
                readOnly={!user.edit}
                type="text"
                ref={roleRef}
                name="role"
                defaultValue={user.role}
              />
            </td>
            <td className={styles.icons}>
              {user.edit ? (
                <i
                  onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
                  className="fas fa-save"
                ></i>
              ) : (
                <i onClick={() => editUser(user.id)} className="fas fa-edit"></i>
              )}
      
              <i onClick={() => deleteUser(user.id)} className="fas fa-trash-alt"></i>
            </td>
          </tr>
          ) : (
            ""
          );
        })}
        {fillRows}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number,
};

export default UsersList;
