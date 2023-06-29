import { useState } from "react";
import style from "../styles/Contact.module.css";
// import { Formik, Form, Field, ErrorMessage } from "formik";

const { contactContainer, form, input, textarea } = style;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className={contactContainer}>
      <h2>Contact</h2>
      <p>
        N'hésitez pas à me contacter pour toute question, remarque ou
        proposition. Je serai heureuse de discuter avec vous et de vous apporter
        mon aide.
      </p>
      <form className={form} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="name"
          required
          className={input}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          required
          className={input}
        />
        <input
          type="text"
          name="subject"
          placeholder="subject"
          required
          className={input}
        />
        <textarea
          name="message"
          placeholder="Type your message here"
          required
          className={textarea}
        />
        <button type="submit">Send</button>
      </form>
      {/* <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.name) {
            errors.name = "Required";
          } else if (!values.email) {
            errors.email = "Required";
          } else if (!values.message) {
            errors.message = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form className={form}>
            <Field name="name" placeholder="name" className={input} />
            <Field
              type="email"
              name="email"
              placeholder="email"
              className={input}
            />
            <Field name="Subject" placeholder="Subject" className={input} />
            <Field
              as="textarea"
              name="message"
              placeholder="message"
              className={textarea}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik> */}
    </div>
  );
};

export default Contact;
