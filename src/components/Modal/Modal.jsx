import "./Modal.css";

function Modal({ message, onClose, onPlay }) {
  const modalClass = message.includes("Congratulations")
    ? "win"
    : message.includes("over")
    ? "lose"
    : "";

  return (
    <div className={`${modalClass} modal`}>
      <h3>{message}</h3>
      <div className="selection">
        <button onClick={onPlay}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
