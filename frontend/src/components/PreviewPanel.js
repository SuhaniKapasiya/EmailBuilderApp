import React from "react";

const PreviewPanel = ({ layoutHtml, formData }) => {
  // Function to render images
  const renderImages = (imageUrls) => {
    return imageUrls
      .map(
        (url) =>
          `<img 
             src="${url}" 
             alt="Uploaded Image" 
             style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 5px; margin: 5px;" 
           />`
      )
      .join("");
  };

  // Generate HTML with replaced placeholders
  const generatePreviewHtml = (html, data) => {
    return html
      .replace("{{title}}", data.title || "")
      .replace("{{content}}", data.content || "")
      .replace("{{footer}}", data.footer || "")
      .replace("{{imageUrls}}", renderImages(data.imageUrls || []));
  };

  return (
    <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Email Preview</h1>
      </header>
      <div
        className="border p-4 bg-white rounded shadow-sm"
        dangerouslySetInnerHTML={{
          __html: generatePreviewHtml(layoutHtml, formData),
        }}
      />
    </div>
  );
};

export default PreviewPanel;
