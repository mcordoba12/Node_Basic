import mongoose from "mongoose";


process.loadEnvFile();
const ConnectionString = process.env.MONGO_URl || "";

export const db = mongoose.connect(ConnectionString).
    then(() =>
        console.log("Base de datos conectada correctamente")
    ).catch(
        (error) => console.error(error)
    );
