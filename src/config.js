import dotenv from 'dotenv';
dotenv.config();

export default {
    SECRET: process.env.SECRET || "ieeproyectos-api"
}