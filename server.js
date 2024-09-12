const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" })); // To handle large JSON data (PDF data)

// Serve the contact form page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contactform.html");
});

// Handle the email sending logic
app.post("/send-email", (req, res) => {
  const { name, email, subject, message, pdfData } = req.body;

  // Create transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pauldinakaranrya@gmail.com", // Replace with your email
      pass: "afes ztun ozwc slsq", // Replace with your password or app-specific password
    },
  });

  // Generate email with the PDF attachment
  const mailOptions = {
    from: `"Contact Form" <your-email@gmail.com>`, // Replace with your email
    to: "pauldinakaransuruli@gmail.com", // Replace with recipient email
    subject: `Message from ${name}: ${subject}`,
    text: `You have received a message from ${name} (${email}).\n\nMessage: ${message}`,
    attachments: [
      {
        filename: "contact_form_submission.pdf",
        content: pdfData.split(",")[1], // Extract base64 string from the data URI
        encoding: "base64",
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
