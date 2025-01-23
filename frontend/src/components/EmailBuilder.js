// import {
//   getEmailLayout,
//   uploadImage,
//   uploadEmailConfig,
// } from "../api/api"; // Fetch the email layout
// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const EmailBuilder = () => {
//   const [layoutHtml, setLayoutHtml] = useState("");
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     footer: "",
//     imageUrls: [],
//   });

//   // Fetch email layout HTML from the backend
//   const fetchLayout = async () => {
//     try {
//       const response = await getEmailLayout();
//       setLayoutHtml(response.data); // Save raw HTML layout from the backend
//     } catch (error) {
//       console.error("Error fetching email layout:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLayout();
//   }, []);

//   // Handle input changes for title and footer
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle content changes from ReactQuill editor
//   const handleContentChange = (value) => {
//     setFormData((prev) => ({ ...prev, content: value }));
//   };

//   // Handle image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const formDataImage = new FormData();
//     formDataImage.append("image", file);

//     try {
//       const response = await uploadImage(formDataImage);
//       const imageUrl = response.data?.data?.secure_url;

//       setFormData((prev) => ({
//         ...prev,
//         imageUrls: [...prev.imageUrls, imageUrl],
//       }));
//       alert("Image uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Failed to upload image.");
//     }
//   };

//   // Save the email template
//   const saveTemplate = async () => {
//     try {
//       const response = await uploadEmailConfig(formData);
//       console.log("Template saved successfully:", response.data);
//       alert("Template saved successfully!");
//     } catch (error) {
//       console.error("Error saving email template:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left Preview Panel */}
//       <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
//         <header className="mb-4">
//           <h1 className="text-xl font-semibold">Email Preview</h1>
//         </header>
//         <div
//           className="border p-4 bg-white rounded shadow-sm"
//           dangerouslySetInnerHTML={{
//             __html: layoutHtml
//               .replace("{{title}}", formData.title)
//               .replace("{{content}}", formData.content)
//               .replace("{{footer}}", formData.footer)
//               .replace(
//                 "{{#each imageUrls}}",
//                 formData.imageUrls
//                   .map(
//                     (url) =>
//                       `<img src="${url}" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 5px; margin: 5px;" />`
//                   )
//                   .join("")
//               )
//               .replace("{{/each}}", ""),
//           }}
//         />
//       </div>

//       {/* Right Editing Panel */}
//       <div className="w-1/3 bg-white p-4 border-l overflow-y-auto">
//         <header className="mb-4">
//           <h1 className="text-xl font-semibold">Email Editor</h1>
//         </header>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Enter email title"
//             className="w-full px-3 py-2 border rounded focus:outline-none"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Content:</label>
//           <ReactQuill
//             value={formData.content}
//             onChange={handleContentChange}
//             placeholder="Enter email content"
//             className="mb-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Footer:</label>
//           <input
//             type="text"
//             name="footer"
//             value={formData.footer}
//             onChange={handleInputChange}
//             placeholder="Enter footer text"
//             className="w-full px-3 py-2 border rounded focus:outline-none"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Upload Image:</label>
//           <input
//             type="file"
//             onChange={handleImageUpload}
//             className="mb-2"
//           />
//           <div className="flex gap-2 flex-wrap">
//             {formData.imageUrls.map((url, index) => (
//               <img
//                 key={index}
//                 src={url}
//                 alt={`Uploaded ${index}`}
//                 className="w-16 h-16 rounded border"
//               />
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={saveTemplate}
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Save Template
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmailBuilder;

import React from "react";
import { useEmailBuilder } from "../hooks/useEmailBuilder";
import PreviewPanel from "./PreviewPanel";
import EditorPanel from "./EditorPanel";

const EmailBuilder = () => {

  const {
    layoutHtml,
    formData,
    handleInputChange,
    handleContentChange,
    handleImageUpload,
    saveTemplate,
    downloadTemplate,
  } = useEmailBuilder();

  return (
    <div className="flex h-screen">
      
      <PreviewPanel layoutHtml={layoutHtml} formData={formData} />
      <EditorPanel
        formData={formData}
        handleInputChange={handleInputChange}
        handleContentChange={handleContentChange}
        handleImageUpload={handleImageUpload}
        saveTemplate={saveTemplate}
        downloadTemplate={downloadTemplate}
      />
    </div>
  );
};

export default EmailBuilder;

