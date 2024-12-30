import "./App.css";
import "modern-normalize";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import fetchPhotosByQuery from "./unsplash-api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

Modal.setAppElement("#root");

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setError(false);
      setQuery(searchQuery);
      setPage(1);
      setPhotos([]);

      const data = await fetchPhotosByQuery(searchQuery, 1);
      setPhotos(data.results);
      setTotalPages(Math.ceil(data.total / 15));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchPhotosByQuery(query, nextPage);
      setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery photos={photos} onImageClick={handleImageClick} />
      )}
      {loading && <Loader />}
      {photos.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        image={selectedImage}
      />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
