import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/listings/listingAction";
import Modal from "../../UI/Modal/Modal";
import styles from "./Logout.module.css";

function Logout(props) {
  const dispatch = useDispatch();
  const userRooms = useSelector((state) => state.user.userRooms);
  const history = useHistory();

  const handleClick = () => {
    history.push("/yourrooms");
    props.toggleLogin();
  };

  const handleLogout = () => {
    dispatch(logout());
    props.toggleLogin();
    history.push("/");
  };
  return (
    <Modal toggleLogin={props.toggleLogin}>
      <div className={styles.logout}>
        <li>{props.email}</li>
        <li onClick={handleClick}>
          your rooms{" "}
          <span className={styles.notification}>{userRooms.length}</span>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.btn}>
            logout
          </button>
        </li>
      </div>
    </Modal>
  );
}

export default Logout;
