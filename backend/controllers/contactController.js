const axios = require("axios");
const sendMail = require("../utils/sendMail"); // ✅ IMPORTANT

// ================= CONTROLLER =================
exports.submitContactForm = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      customerType,
      internet,
      captchaToken,
    } = req.body;

    // ---------- BASIC VALIDATION ----------
    if (!name || !email || !phone || !location || !captchaToken) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // ---------- CAPTCHA VERIFY ----------
    const captchaResponse = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );

    if (!captchaResponse.data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    // ---------- EMAIL TO ADMIN ----------
    const mailSent = await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Customer Type:</b> ${customerType || "N/A"}</p>
        <p><b>Internet:</b> ${internet || "N/A"}</p>
      `,
    });

    if (!mailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }

    // ---------- SUCCESS ----------
    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });

  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
