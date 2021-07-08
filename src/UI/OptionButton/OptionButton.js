import React from "react";
import styles from "./OptionButton.module.css";
import option from "../../assets/option.png";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { removeListing } from "../../redux/listings/listingAction";
import { useDispatch } from "react-redux";

function OptionButton(props) {
  const [isVisible, setIsVisible] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setIsVisible((prevState) => !prevState); //handling dropdown visibility
  };
  const handleSelect = (type, id) => {
    handleClick();
    switch (type) {
      case "EDIT":
        history.push("/editListing/" + id);
        break;
      case "REMOVE":
        dispatch(removeListing(id));
        break;
      default:
        return;
    }
  };
  return (
    <div className={styles["option-container"]}>
      <button>
        <img src={option} alt="opt" onClick={handleClick} />
      </button>

      {isVisible === true && (
        <div className={styles.dropdown}>
          {props.items.map((item) => (
            <p
              onClick={(e) => {
                handleSelect(item.type, item.id);
              }}
            >
              {item.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default OptionButton;
