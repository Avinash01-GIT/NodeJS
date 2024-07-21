const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const nodeMailer = require("nodemailer");
const FileModel = require("../model/filemodel");

const transporter = nodeMailer.createTransport({
  host: "127.0.0.1",
  port: "1025",
  secure: false,
});

const uploadFolderPath = "uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolderPath),
  filename: (req, file, cb) => {
    const filename = uuidv4() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
}).single("attachment");

const uploadfile = (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "File size too large",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    console.log(req.file);
    const fileData = {
      originalName: req.file.originalname,
      newName: req.file.filename,
      size: req.file.size,
    };

    try {
      const newlyInsertedFile = await FileModel.create(fileData);
      console.log(newlyInsertedFile);
      res.json({
        success: true,
        message: "File uploaded successfully",
        fileId: newlyInsertedFile._id,
      });
    } catch (dbError) {
      console.log(dbError);
      res.status(500).json({
        success: false,
        message: "Database error",
      });
    }
  });
};

const generateSharableLink = async (req, res) => {
  try {
    const fileData = await FileModel.findById(req.params.fileId);
    if (!fileData) {
      // File is not available for this ID
      return res.status(400).json({
        success: false,
        message: "Invalid File ID",
      });
    }
    const sharableLink = `/file/downloads/${req.params.fileId}`;
    res.json({
      success: true,
      message: "File sharable link generated successfully",
      sharableLink: sharableLink,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
};

const downloadFile = async (req, res) => {
  const fileId = req.params.fileId;
  const fileData = await FileModel.findById(fileId);
  if (!fileData) {
    // File is not available for this ID
    return res.status(400).end("Invalid URL");
  }
  const path = `uploads/${fileData.newName}`;
  res.download(path, fileData.originalName);
};

const sendMail = async (req, res) => {
  const idName = req.body.fileId;
  const sharableLink = `${process.env.BASE_URL}/file/download/${idName}`;
  const emailData = {
    to: req.body.email,
    from: "do-not-reply@filesharing.com",
    subject: "File Sharing Link",
    html: `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #f7f7f7; border: 2px solid #ccc; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
  <h2 style="text-align: center; color: #1e90ff; font-size: 24px;">You've Received a File!</h2>
  <p style="text-align: center; font-size: 16px; color: #555;">
    Your friend has shared a file with you via the FileSharing App.
  </p>
  <!-- Removed GIF section -->
  <p style="text-align: center; font-size: 18px; color: #333;">
    Click the button below to download your file:
  </p>
  <div style="text-align: center; margin: 20px 0;">
    <a href="${sharableLink}" target="_blank" style="display: inline-block; padding: 12px 24px; color: #fff; background-color: #1e90ff; text-decoration: none; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: background-color 0.3s;">Download File</a>
  </div>
  <hr style="border-color: #ccc;">
  <h3 style="color: #333; font-size: 20px;">File Details:</h3>
  <ul style="font-size: 16px; color: #555;">
    <li><strong>File ID:</strong> ${idName}</li>
  </ul>
  <hr style="border-color: #ccc;">
  <p style="font-size: 16px; color: #555;">
    If you have any issues downloading the file, please contact our support team.
  </p>
  <p style="text-align: center; font-size: 14px; color: #777;">&copy; 2024 FileSharing App</p>
</div>
    `,
  };
  transporter.sendMail(emailData, (error, info) => {
    if (error) {
      return res.json({
        success: false,
        message: "Unable to send email",
        error: error,
      });
    }
    res.json({
      success: true,
      message: "Mail sent successfully",
    });
  });
};

const fileController = {
  uploadfile,
  generateSharableLink,
  downloadFile,
  sendMail,
};

module.exports = fileController;
