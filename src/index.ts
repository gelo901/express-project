import express, { Request, Response } from "express";
import { videosRouter } from "./routes/videos";

const app = express()
const port = 3000

app.use('/videos', videosRouter);
app.get('/', (req: Request, res: Response) => {
    let helloWorld = 'Hello World!123123';
    res.send(helloWorld)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})