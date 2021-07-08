import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/listings/listingAction";
import Modal from "../../UI/Modal/Modal";
import styles from "./Login.module.css";

function Login(props) {
  const [isHost, setIsHost] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailValidity, setEmailValidity] = useState(null);
  const [passwordValidity, setPasswordValidity] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let emailRegExp = /^[a-z 0-9]+@[a-z 0-9]+[.][a-z 0-9]+/gi; //regular expression to validate email
    let phoneRegExp = /^[6-9]+[0-9]+/g; //for validating ph number
    if (emailRegExp.test(emailInput)) {
      setEmailValidity(true);
    } else {
      setEmailValidity(false);
    }
    if (passwordInput.length === 10 && phoneRegExp.test(passwordInput)) {
      setPasswordValidity(true);
    } else {
      setPasswordValidity(false);
    }
  }, [emailInput, passwordInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.toggleLogin();

    let item = {
      email: emailInput,
      phoneNumber: passwordInput,
      isHost,
    };

    dispatch(login(item));
  };

  return (
    <Modal toggleLogin={props.toggleLogin}>
      <div className={styles["login"]}>
        <div className={styles["mode-select"]}>
          <div
            className={`${styles.left} ${!isHost && styles["btnActive"]}`}
            onClick={(e) => setIsHost(false)}
          >
            Guest
          </div>
          <div
            className={`${styles.right} ${isHost && styles["btnActive"]}`}
            onClick={(e) => setIsHost(true)}
          >
            Host
          </div>
        </div>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <label
            className={`${styles["customField"]} ${
              emailValidity === false ? styles["invalid"] : "valid"
            }`}
          >
            <input
              type="email"
              name="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <span className={styles["placeHolder"]}>Email</span>
          </label>
          <label
            className={`${styles["customField"]} ${
              passwordValidity === false ? styles["invalid"] : "valid"
            }`}
          >
            <input
              type="text"
              name="phoneNumber"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <span className={styles["placeHolder"]}>Phone number</span>
          </label>
          <input
            type="submit"
            value="LogIn"
            className={styles["submit-button"]}
          />
        </form>
      </div>
    </Modal>
  );
}

export default Login;
