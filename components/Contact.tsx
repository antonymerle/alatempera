import { useState } from "react";
import { ContactMessage, ResMailer } from "@/types/types";
import { toast } from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";
import style from "../styles/Contact.module.css";

const { contactContainer, form, input, textarea, phoneClass } = style;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const { t } = useTranslation("contact");

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
        <h3>{t("sentNotification")}</h3>
      ) : (
        <>
          <p>{t("intro")}</p>
          <form className={form} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="name"
              placeholder={t("labelName")}
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
              placeholder={t("labelSubject")}
              required
              className={input}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              name="message"
              placeholder={t("labelMessage")}
              required
              className={textarea}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">{t("sendButton")}</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Contact;
