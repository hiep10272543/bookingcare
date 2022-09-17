// file chạy server
import express from 'express'
import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
const cors = require('cors');
require('dotenv').config()

let app = express();
app.use(cors({ credentials: true, origin: true }))

// config app 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

viewEngine(app);
initWebRoutes(app);

connectDB()

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`be nodejs is running on the port: ${port}`);
}
);