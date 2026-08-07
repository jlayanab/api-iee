import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ieedb?authSource=admin";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB:", mongoURI.split('@').pop()))
  .catch(err => console.error("Error de conexión a MongoDB:", err));