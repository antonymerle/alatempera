import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { ContactMessage, ResMailer } from "@/types/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResMailer>
) {
  if (req.method !== "POST") {
    console.log("error 405");

    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed.");
  } else if (
    !req.body.name ||
    !req.body.email ||
    !req.body.subject ||
    !req.body.message
  ) {
    console.log("error 400");
    return res.status(400).end("Missing param");
  } else {
    const contactMessage: ContactMessage = {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: contactMessage.email,
      to: process.env.GMAIL_USER,
      subject: `Message de ${contactMessage.name} - ${contactMessage.email} : ${contactMessage.subject}`,
      text: contactMessage.message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ success: false, data: contactMessage, error: error.message });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ success: true, data: contactMessage, error: null });
      }
    });
  }
}
