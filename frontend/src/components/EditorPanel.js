import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";


const EditorPanel = ({
  formData,
  handleInputChange,
  handleContentChange,
  handleImageUpload,
  saveTemplate,
  downloadTemplate,
}) => {
  return (
    <div className="w-1/3 bg-white p-4 border-l overflow-y-auto">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Email Editor</h1>
      </header>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter email title"
          className="w-full px-3 py-2 border rounded focus:outline-none"
        />
      </div>

      {/* <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content:</label>
        <ReactQuill
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Enter email content"
          className="mb-2"
        />
      </div> */}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content:</label>
        <CustomToolbar />
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          placeholder="Enter email content"
          modules={{
            toolbar: {
              container: "#toolbar", // Link to the Custom Toolbar
            },
          }}
          formats={[
            "size",
            "bold",
            "italic",
            "underline",
            "color",
            "background",
            "align",
          ]}
          className="mb-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Footer:</label>
        <input
          type="text"
          name="footer"
          value={formData.footer}
          onChange={handleInputChange}
          placeholder="Enter footer text"
          className="w-full px-3 py-2 border rounded focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Upload Image:</label>
        <input type="file" onChange={handleImageUpload} className="mb-2" />
        <div className="flex gap-2 flex-wrap">
          {formData.imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded ${index}`}
              className="w-16 h-16 rounded border"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between p-2">
        <button
          onClick={saveTemplate}
          className="w-full bg-blue-500 text-white py-2 mr-2  rounded hover:bg-blue-600"
        >
          Save Template
        </button>

        <button
          onClick={downloadTemplate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Download Template
        </button>
      </div>
    </div>
  );
};

export default EditorPanel;
