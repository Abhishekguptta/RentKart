import cors from "cors";
import express, { json } from "express";
// import sharp from 'sharp'
import "./db/mongoose.js";
import userRouter from './routers/user.js';
import roomRouter from './routers/rooms.js'


const app = express();
const port = process.env.PORT || 3001;

app.use(json());

app.use(cors({
  origin: 'http://localhost:3000',
}))

app.use(userRouter);
app.use(roomRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// upload.single--> multer middleware 