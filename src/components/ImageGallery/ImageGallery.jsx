import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ photos, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {photos.map((photo) => (
        <li key={photo.id} className={css.item}>
          <ImageCard
            src={photo.urls.small}
            alt={photo.alt_description}
            onClick={() => onImageClick(photo)}
          />
        </li>
      ))}
    </ul>
  );
}
