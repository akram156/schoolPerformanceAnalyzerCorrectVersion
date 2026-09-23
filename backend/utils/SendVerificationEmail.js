const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, code) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,

    subject: "School Analyzer - Email Verification",

    html: `
      <div style="font-family: Arial, sans-serif;">
      <h2>Welcome to School Analyzer</h2>

      <p>
        Thank you for creating your account.
      </p>

      <p>
        Use the following verification code to confirm your email address or reset your password:
      </p>

      <h1>${code}</h1>

      <p>
        This code is required to activate your School Analyzer account or reset your password.
      </p>

      <p>
        School Analyzer
      </p>
    </div>

      
    `,
  });
};

module.exports = sendVerificationEmail;
