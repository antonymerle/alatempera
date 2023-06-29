import { useState } from "react";
import style from "../styles/Contact.module.css";
import { ContactMessage, ResMailer } from "@/types/types";
import { toast } from "react-hot-toast";

// import { Formik, Form, Field, ErrorMessage } from "formik";

const { contactContainer, form, input, textarea, phoneClass } = style;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    const contactMessage: ContactMessage = {
      name,
      email,
      subject,
      message,
    };

    const response = await fetch("/api/mailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(contactMessage),
    });
    const data: ResMailer = await response.json();

    console.log(data);

    if (data.success) {
      toast.success("Votre message a bien été envoyé !");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSent(true);
    } else {
      toast.error("Erreur d'envoi du message");
    }
  };

  const isValidEmail = (email: string) => {
    return emailRegex.test(email);
  };

  const canSubmit = () => {
    return (
      name !== "" &&
      email !== "" &&
      subject !== "" &&
      message !== "" &&
      isValidEmail(email) &&
      phone === "" // honeypot check
    );
  };

  return (
    <div className={contactContainer}>
      <h2>Contact</h2>

      {sent ? (
        <h3>Merci pour votre message ! Je vous répondrai dès que possible.</h3>
      ) : (
        <>
          <p>
            N'hésitez pas à me contacter pour toute question, remarque ou
            proposition. Je serai heureuse de discuter avec vous et de vous
            apporter mon aide.
          </p>
          <form className={form} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="name"
              placeholder="name"
              required
              className={input}
              onChange={(e) => setName(e.target.value)}
            />
            {/* phone is a honeypot field to prevent spam */}
            <input
              type="text"
              name="phone"
              placeholder="phone"
              className={phoneClass}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              className={input}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              name="subject"
              placeholder="subject"
              required
              className={input}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              name="message"
              placeholder="Type your message here"
              required
              className={textarea}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Contact;
