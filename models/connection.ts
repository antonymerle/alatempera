import mongoose from "mongoose";

const dbConnect = async () => {
  const connectionString = process.env.DB_CONNECTION_STRING ?? "nope";

  mongoose
    .connect(connectionString, { connectTimeoutMS: 15000 })
    .then(() => console.log("Connecté à la base de données"))
    .catch((error) => console.log(error));
};

export default dbConnect;
