import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);


import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js"; 
import cors from "cors";
import { server,app } from "./socket/socket.js";

dotenv.config();



const PORT = process.env.PORT || 8080;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)

connectDB();

server.listen(PORT, () => {
  
  console.log(`Server is running on port http://localhost:${PORT}`);
})