import { useState, useEffect } from "react";
import {
  getEmailLayout,
  uploadImage,
  uploadEmailConfig,
  renderAndDownloadTemplate,
} from "../api/api";

export const useEmailBuilder = () => {
  const [layoutHtml, setLayoutHtml] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    footer: "",
    imageUrls: [],
  });

  // Fetch email layout from the backend
  const fetchLayout = async () => {
    try {
      const response = await getEmailLayout();
      setLayoutHtml(response.data);
    } catch (error) {
      console.error("Error fetching email layout:", error);
    }
  };

  useEffect(() => {
    fetchLayout();
  }, []);

  // Handle input changes for title and footer
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content changes from the editor
  const handleContentChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      const response = await uploadImage(formDataImage);
      const imageUrl = response.data?.data?.secure_url;

      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, imageUrl],
      }));
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  // Save the email template
  const saveTemplate = async () => {
    try {
      const response = await uploadEmailConfig(formData);
      alert("Template saved successfully!");
      console.log("Template saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving email template:", error);
    }
  };

  // Download Template Function
  const downloadTemplate = async () => {
    try {
      const response = await renderAndDownloadTemplate(formData);

      // Create a link to download the rendered HTML
      const blob = new Blob([response.data], { type: "text/html" }); // Use response.data since Axios returns the blob in `data`
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "template.html";
      link.click();
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  return {
    layoutHtml,
    formData,
    handleInputChange,
    handleContentChange,
    handleImageUpload,
    saveTemplate,
    downloadTemplate,
  };
};
