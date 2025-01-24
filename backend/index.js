const express = require("express");
const cors = require("cors");
const database = require("./config/database");
const emailRoutes = require('./routes/emailRoutes')
const { cloudinaryConnect } = require("./config/cloudinary");

const fileUpload = require("express-fileupload");



require("dotenv").config();



const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://emailbuilderapp-1.onrender.com", 
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp",
  })
);



app.use(express.json());
database.connect();

//cloudinaryConnection
cloudinaryConnect();


//All Routes come her 
app.use("/api/emails", emailRoutes);
// app.use("/uploads", express.static("uploads"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
