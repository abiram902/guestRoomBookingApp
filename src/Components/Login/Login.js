import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/listings/listingAction";
import Modal from "../../UI/Modal/Modal";
import styles from "./Login.module.css";

function Login(props) {
  const [isHost, setIsHost] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailValidity, setEmailValidity] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
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
    if (!emailValidity || !passwordValidity) {
      setErrMsg("invalid login credentials");
      return;
    }
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
            className={`${styles.customField} ${
              !emailValidity && isEmailTouched
                ? styles["invalid"]
                : emailValidity
                ? "valid"
                : styles.customField
            }`}
          >
            <input
              type="email"
              name="email"
              required
              value={emailInput}
              onChange={(e) => {
                setIsEmailTouched(true);
                setEmailInput(e.target.value);
              }}
            />
            <span className={styles["placeHolder"]}>Email</span>
          </label>
          <label
            className={`${styles.customField} ${
              !passwordValidity && isPasswordTouched
                ? styles["invalid"]
                : passwordValidity
                ? "valid"
                : styles.customField
            }`}
          >
            <input
              type="text"
              name="phoneNumber"
              required
              value={passwordInput}
              onChange={(e) => {
                setIsEmailTouched(true);
                setPasswordInput(e.target.value);
              }}
            />
            <span className={styles["placeHolder"]}>Phone number</span>
          </label>
          {errMsg}
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
