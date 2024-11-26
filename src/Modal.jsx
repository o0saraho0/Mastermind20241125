import "./Modal.css";

function Modal({ message, onClose, onPlay }) {
  return (
    <div className="modal">
      <p>{message}</p>
      <div className="selection">
        <button onClick={onPlay}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
