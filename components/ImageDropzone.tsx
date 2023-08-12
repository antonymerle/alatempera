import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MB_IN_BYTES = 1000000;

const ImageDropzone = ({ onFileUpload }: any) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the accepted files, e.g., copy them to the public folder
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Assuming you have an API endpoint to handle file upload
        fetch("/api/admin/upload-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: file.name,
            dataUrl: reader.result,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Notify the parent component that the file was uploaded
            onFileUpload(data.publicUrl);
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: MB_IN_BYTES * 6, // 4MB max file size
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      style={{ border: "1px dashed black", padding: "1rem", cursor: "pointer" }}
    >
      <input {...getInputProps()} />
      <p>
        Glisser/déposer une image ou cliquer pour sélectionner un fichier jpg ou
        png
      </p>
    </div>
  );
};

export default ImageDropzone;
