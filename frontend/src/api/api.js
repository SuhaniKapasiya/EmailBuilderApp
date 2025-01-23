import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/emails" });

export const getEmailLayout = () => API.get("/getEmailLayout");

export const uploadEmailConfig = (data) => API.post("/uploadEmailConfig", data);

export const uploadImage = async (formData) => {

  return await API.post("/uploadImage", formData, {
    headers: { "Content-Type": "multipart/form-data" }, // Required for file uploads
  });
};
export const renderAndDownloadTemplate = (formData) =>
  API.post("/renderAndDownloadTemplate", formData, {
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob", // Important: Axios should treat the response as a blob for file download
  });