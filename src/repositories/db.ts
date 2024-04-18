import { MongoClient } from 'mongodb'

const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

export const client = new MongoClient(mongoURI)

export async function rubDb() {
  try {
    await client.connect()
    await client.db('products').command({ ping: 1 })
  } catch (e) {
    await client.close()
  }
}
