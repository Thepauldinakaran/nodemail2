document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("Contact Form Submission", 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Subject: ${subject}`, 10, 40);
    doc.text(`Message: ${message}`, 10, 50);

    // Download the PDF in the browser
    doc.save("contact_form_submission.pdf");

    // Convert PDF to base64
    const pdfDataUri = doc.output("datauristring");

    // Send form data and PDF to the server
    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
        pdfData: pdfDataUri, // Send the base64 PDF to the server
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "success") {
          alert("Email sent successfully!");
        } else {
          alert("Error sending email.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Something went wrong!");
      });
  });
