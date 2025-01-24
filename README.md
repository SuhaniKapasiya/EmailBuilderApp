# Email Builder Application

An **Email Builder Application** built using **MERN Stack** (MongoDB, Express, React, Node.js) with **Cloudinary** 
integration for image uploads. This application allows users to create email templates with customizable title, content, footer, and images.

## Features

- **Rich Text Editing**: Use a WYSIWYG editor (`ReactQuill`) to customize email content.
- **Image Upload**: Upload images to Cloudinary and use them in email templates.
- **Dynamic PreviewPanel**: Live preview of the email layout with injected dynamic content.
- **Save Templates**: Store email templates in MongoDB for future use.
- **Responsive Design**: Built with React for seamless UI interactions.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **ReactQuill**: For the rich text editor.
- **Axios**: For making API calls to the backend.

### Backend
- **Node.js**: Runtime environment for server-side JavaScript.
- **Express.js**: Framework for building the backend API.
- **Cloudinary**: For image hosting and CDN delivery.
- **express-fileupload**: Middleware for handling file uploads.

### Database
- **MongoDB**: For storing email templates.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16+)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/email-builder.git
   cd email-builder

2.Install Dependencies
- Backend:
  cd server
  npm install
-Frontend:
  cd client
  npm install

3. Set Up Environment Variables Create a .env file in the server directory with the following variables:
  CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
  CLOUDINARY_API_KEY=your-cloudinary-api-key
  CLOUDINARY_API_SECRET=your-cloudinary-api-secret
  MONGO_URI=your-mongodb-connection-string
  PORT=5000

5. Start the Application
  - Start the backend
   cd backend
   npm start
  - Start the frontend:
    cd frontend
    npm start
  
6. Access the Application

Frontend: http://localhost:3000
Live Link : https://emailbuilderapp-1.onrender.com/
Backend: http://localhost:5000
Live Link : https://emailbuilderapp.onrender.com

7.API Endpoints
Base URL: http://localhost:5000/api/emails
Method	Endpoint	Description
POST	/uploadImage	Upload an image to Cloudinary and return Image URL
POST	/uploadEmailConfig	Save an email template to the database
GET	/getEmailLayout	Fetch the default email layout HTML
POST	/renderAndDownloadTemplate	Render and download an email template

License
This project is licensed under the MIT License.

Contact
For questions or suggestions, feel free to reach out:

Name: suhani
Email: suhanikapasiya2018@gmail.com
GitHub: https://github.com/SuhaniKapasiya
https://github.com/SuhaniKapasiya
