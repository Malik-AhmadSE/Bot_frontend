import mongoose from "mongoose";
export const ConnectDB= async () => {
try {
const DB_OPTIONS = {
dbName: process.env.DATABASE_NAME,
}
await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS)
console.log("Connected Successfully...");
} catch (error) {
console.log(error);
}
}