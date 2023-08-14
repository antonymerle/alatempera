import { useState, useEffect } from "react";
import { EditBlogPostFormProps } from "@/types/types";
import ImageDropzone from "@/components/ImageDropzone";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";
import { toast } from "react-hot-toast";
import style from "../../../styles/Editorpage.module.css";

const { container, editor, uploadedImg } = style;

// TODO : redirect to post after saving it

const compilePostStr = ({
  title,
  description,
  previewImage,
  timestamp,
  content,
}: EditBlogPostFormProps) => {
  return matter.stringify(content, {
    title,
    description,
    previewImage,
    timestamp,
  });
};

const CreateNewPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  // const [previousImgPath, setPreviousImgPath] = useState("");

  const [values, setValues] = useState<EditBlogPostFormProps>({
    title: "",
    description: "",
    previewImage: "",
    timestamp: -1,
    content:
      '<HeroImage\n  src=\n  alt={"main image"}\n  orientation={"landscape"}\n/>\n\nInsérer contenu principal ici',
  });

  const { data: session } = useSession();
  const { pathname: currentPathname } = useRouter();

  // ================= effects ====================

  useEffect(() => {
    if (!session)
      setTimeout(() => {
        Router.push("/");
      }, 2000);
  });

  // live edit the content w/ new image source
  useEffect(() => {
    if (imageUrl) {
      const lines = values.content.split("\n");

      let newContent: string = lines
        .map((line) =>
          line.includes("src=")
            ? `  src="${imageUrl.replace("/tmp", "")}"` // include two spaces for indentation
            : line
        )
        .join("\n");

      // setPreviousImgPath(values.previewImage);
      setValues({
        ...values,
        previewImage: imageUrl.replace("/tmp", ""),
        content: newContent,
      });
    }
  }, [imageUrl]);

  // ================= handles ====================
  const handleFileUpload = (url: any) => {
    setImageUrl(url);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //toast.loading("updating...");
    console.log("loading");

    try {
      // const postStr = compilePostStr({ ...values, timestamp: Date.now() });
      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ values }),
      });
      const data = await response.json();
      console.log({ data });
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    } finally {
      setLoading(false);
      console.log("finished loading");
    }
  };

  if (session)
    return (
      <div className={container}>
        <h2>Créer un post</h2>
        <form onSubmit={handleSubmit} className={editor}>
          <div>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="previewImage">Image</label>
            <input
              type="text"
              id="previewImage"
              name="previewImage"
              value={values.previewImage}
              onChange={handleChange}
              required
              disabled={true}
            />
          </div>
          <label>Image</label>
          <div>
            <ImageDropzone onFileUpload={handleFileUpload} />
            {values.previewImage && (
              <img
                src={imageUrl === "" ? values.previewImage : imageUrl}
                alt={"aperçu"}
                className={uploadedImg}
              />
            )}
          </div>
          {/* <div>
            <label htmlFor="timestamp">Timestamp</label>
            <input
              type="text"
              id="timestamp"
              name="timestamp"
              value={new Date(values.timestamp).toLocaleDateString()}
              onChange={handleChange}
              required
              disabled={true}
            />
          </div> */}
          <div>
            <label htmlFor="content">Contenu</label>
            <textarea
              id="content"
              name="content"
              value={values.content}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            Sauvegarder
          </button>
        </form>
      </div>
    );
  else {
    return (
      <div className={container}>
        <h2>Unauthorized</h2>
        <p>Redirecting...</p>
      </div>
    );
  }
};

export default CreateNewPost;
