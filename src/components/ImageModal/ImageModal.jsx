import Modal from "react-modal";
import css from "./ImageModal.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    background: "none",
    maxWidth: "90vw",
    maxHeight: "90vh",
  },
};

export default function ImageModal({ isOpen, onClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      {image && (
        <div className={css.modalContent}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={css.modalImage}
          />
          <div className={css.imageInfo}>
            <p>Author: {image.user.name}</p>
            <p>Likes: {image.likes}</p>
            {image.description && <p>Description: {image.description}</p>}
          </div>
        </div>
      )}
    </Modal>
  );
}
