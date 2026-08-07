import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/ieedb?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

  //mongoose.connect("mongodb://sa:MpA2005mPa@190.123.36.43:27017/ieedb?authSource=admin", {
  //  useNewUrlParser: true,
  //  useUnifiedTopology: true,
  //})
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión", err));