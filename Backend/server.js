import app from './app.js'
import ConnectDB from './database/db.js'
import dotenv from 'dotenv'

dotenv.config();

ConnectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
console.log(`Server is running on ${PORT}`)
})