import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import notFoundMiddleware from './middleware/NotFoundMiddleware.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import connectDB from './db/connect.js'
import authRoutes from './routes/authRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'
import authenticateUser from './middleware/auth.js'
// 
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
// 
import cookieParser from 'cookie-parser'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'


const app = express()
dotenv.config()

if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/', (req, res) => {
    res.json({msg: 'Hello world'})
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/jobs', authenticateUser, jobsRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build/index.html'))
})

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log('Port is listening on:', port);
        })
    } catch (error) {
        console.log(error);
    }
}

start()