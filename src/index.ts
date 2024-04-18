import { app, port } from './settings'
import { rubDb } from './repositories/db'

const startApp = async () => {
  await rubDb()
  app.listen(port, () => {
    console.log(`App is running on Port ${port}`)
  })
}

startApp()
