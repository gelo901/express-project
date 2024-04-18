import express, { type Request, type Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { videosRouter } from './routes/videos'
import { testingRouter } from './routes/testings'
import { blogsRouter } from './routes/blogs'
import { postRouter } from './routes/posts'

dotenv.config()

export const app = express()
export const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/videos', videosRouter)
app.use('/blogs', blogsRouter)
app.use('/posts', postRouter)
app.use('/testing', testingRouter)
app.get('/', (req: Request, res: Response) => {
  const helloWorld = 'Hello World'
  res.send(helloWorld)
})
