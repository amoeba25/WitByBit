import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
  },
};

Modal.setAppElement("#root");

const TimeoutModal = ({ modalIsOpen }) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  const navigate = useNavigate();
  function closeModal() {
    navigate("/");
  }

  return (
    <div className="expiry-modal">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Session has expired</h2>
        <div>
          Your login session has expired <br />
          Please login again to continue
        </div>
        <button className="modal-button" onClick={closeModal}>
          Login
        </button>
      </Modal>
    </div>
  );
};

export default TimeoutModal;
