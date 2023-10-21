import express, { type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import { videosRouter } from './routes/videos'
import { testingRouter } from './routes/testings'

export const app = express()
export const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/videos', videosRouter)
app.use('/testing', testingRouter)
app.get('/', (req: Request, res: Response) => {
  const helloWorld = 'Hello World'
  res.send(helloWorld)
})
