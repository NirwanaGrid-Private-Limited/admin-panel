const nodemailer = require("nodemailer");

// ================= TRANSPORTER =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ================= SEND MAIL FUNCTION =================
const sendMail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"NirwanaGrid" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error.message);
    return false;
  }
};

module.exports = sendMail;
