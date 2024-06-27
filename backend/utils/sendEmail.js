import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  console.log(email + " " + subject + " " + text);
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      // requireTLS: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: "demofornode09@gmail.com",
        pass: "rnqbryzzbbwjhcsh",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    await transporter.sendMail({
      from: "demofornode09@gmailcom",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

export default sendEmail;
