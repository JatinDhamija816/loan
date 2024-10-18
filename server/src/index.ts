import dotenv from 'dotenv'
import ConnectDB from './database/db';
import app from './app';

dotenv.config()
const PORT = process.env.PORT || 5000

ConnectDB()
    .then(() => {
        app.listen((PORT), () => {
            console.log(`Server Start at http://localhost:${PORT}`)
        })
    }).catch((error) => {
        throw error
    })