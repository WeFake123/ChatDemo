import "../componentes/styles/imageModal.css";

export const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="imageModalOverlay" onClick={onClose}>
      <div className="imageModalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✕</button>
        <img src={image} alt="preview" />
      </div>
    </div>
  );
};