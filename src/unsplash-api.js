import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

const config = {
  headers: {
    "Accept-Version": "v1",
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
};

const fetchPhotosByQuery = async (query, page = 1) => {
  const response = await axios.get(
    `/search/photos?query=${query}&page=${page}&per_page=15`,
    config
  );
  return response.data;
};

export default fetchPhotosByQuery;
