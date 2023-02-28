import {readFile} from 'fs/promises'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/connect.js'
import Jobs from './models/Jobs.js'

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Jobs.deleteMany()
    const jsonProducts = JSON.parse(await readFile(new URL('./mock-data.json', import.meta.url)))
    console.log(jsonProducts);
  } catch (error) {
    console.log(error);
  }
}

start()
