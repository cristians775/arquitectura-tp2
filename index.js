import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import envs from 'dotenv';
import cors from 'cors'
import routes from './routes/index.js'

envs.config()
const PORT = process.env.PORT || 3001;
const uri = process.env.DB_CONNECTION;
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// Import routes
app.use('/', routes);

// Database conection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(e => console.log('Error db:', e))

// Server initialization
app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`)
})