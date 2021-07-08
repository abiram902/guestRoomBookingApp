import React from "react";
import { Fragment } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.toggleLogin}></div>;
};

const ModalOverLay = (props) => {
  return <div className="modal-overlay">{props.children}</div>;
};

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop toggleLogin={props.toggleLogin} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverLay>{props.children}</ModalOverLay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
}

export default Modal;
