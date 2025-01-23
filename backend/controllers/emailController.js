const path = require("path");
const fs = require("fs");
// const upload = require("../config/multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `dtqnuyqei`,
  api_key: `851748187837926`,
  api_secret: `nOyEDZgrE4Gvy8qi6p4vnBvgaXg`,
});

const streamifier = require("streamifier");

const EmailTemplate = require("../models/EmailTemplate");

// Get HTML Layout
exports.getEmailLayout = (req, res) => {
  const layoutPath = path.join(__dirname, "../uploads/layout.html");
  //  console.log("Resolved Layout Path:", layoutPath);

  fs.readFile(layoutPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Unable to load layout" });
    res.send(data);
  });
};

exports.uploadImage = async (req, res) => {
  try {
    
    // Check if a file was uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.image; // Access the uploaded file
    console.log("File received:", file.name);

    // Upload to Cloudinary using tempFilePath
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "email-builder",
      resource_type: "auto", // Handles different file types (e.g., images, videos)
    });

    // Return the response
    return res.status(200).json({ success: true, data: uploadResult });
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred while uploading the file" });
  }
};


// 3. Save Email Template
exports.uploadEmailConfig = async (req, res) => {
  try {
    const { title, content, footer, imageUrls } = req.body;
    const newTemplate = new EmailTemplate({
      title,
      content,
      footer,
      imageUrls,
    });
    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ error: "Unable to save email template" });
  }
};

// 4. Render and Download Template
// exports.renderAndDownloadTemplate = (req, res) => {

//   const { title, content, footer, imageUrls } = req.body;

//   const layoutPath = path.join(__dirname, "../uploads/layout.html");

//   // Validate input data (basic sanitization example)
//   if (!title || !content || !footer || !Array.isArray(imageUrls)) {
//     return res.status(400).json({ error: "Invalid input data" });
//   }

//   fs.readFile(layoutPath, "utf8", (err, html) => {
//     if (err) return res.status(500).json({ error: "Unable to load layout" });

//     // Render the template with dynamic values
//     let renderedHtml = html
//       .replace("{{title}}", title)
//       .replace("{{content}}", content)
//       .replace("{{footer}}", footer);

//     imageUrls.forEach((url, idx) => {
//       renderedHtml = renderedHtml.replace(`{{image${idx + 1}}}`, url);
//     });

//     // Return the HTML as a downloadable file
//     res.set("Content-Type", "text/html");
//     res.set("Content-Disposition", "attachment; filename=template.html");
//     res.send(renderedHtml);
//   });
// };


exports.renderAndDownloadTemplate = (req, res) => {
  
  const { title, content, footer, imageUrls } = req.body;

  const layoutPath = path.join(__dirname, "../uploads/layout.html");

  if (!title || !content || !footer || !Array.isArray(imageUrls)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  fs.readFile(layoutPath, "utf8", (err, html) => {
    if (err) return res.status(500).json({ error: "Unable to load layout" });

    // Generate <img> tags for the images
    const imagesHtml = imageUrls
      .map(
        (url) =>
          `<img src="${url}" alt="Uploaded Image" style="margin: 5px; border-radius: 5px;" />`
      )
      .join("");

    // Replace placeholders in the template
    const renderedHtml = html
      .replace("{{title}}", title)
      .replace("{{content}}", content)
      .replace("{{footer}}", footer)
      .replace("{{imageUrls}}", imagesHtml); // Replace image placeholder

    // Send the rendered HTML as a downloadable file
    res.set("Content-Type", "text/html");
    res.set("Content-Disposition", "attachment; filename=template.html");
    res.send(renderedHtml);
  });
};
