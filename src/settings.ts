import express, { Request, Response } from "express";
import bodyParser from 'body-parser'
import { videosRouter } from "./routes/videos";

export const app = express()
export const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/videos', videosRouter);
app.get('/', (req: Request, res: Response) => {
    let helloWorld = 'Hello World!123123';
    res.send(helloWorld)
})