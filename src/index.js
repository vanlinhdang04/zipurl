import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import path from 'path';
import url from 'url';
import viewsRouter from './routes/views.js'
import urlRouter from './routes/urlShortener.js'
import redirectRoute from './routes/redirect.js'
import connectToDatabase from './config/database.js'

const app = express();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDatabase().then(db => {
    app.use(cors());
    app.use(express.json());
    app.set('views', __dirname + "/views");
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    
    // view pages
    app.use('/', viewsRouter);
    
    // redirect url
    app.use('/r', redirectRoute);
    
    // api
    app.use('/api/s', urlRouter);

    app.use((err, req, res, next) => {
        const errorStatus = err.status || 500;
        const errorMessage = err.message || "Something went wrong!";
        return res.status(errorStatus).json({
          success: false,
          status: errorStatus,
          message: errorMessage,
          stack: err.stack,
        });
      });

    // Start the server
    app.listen(process.env.PORT, () => {
        console.log(`Server started on http://localhost:${process.env.PORT}`);
      });

})
.catch((error) => {
    console.error('Error connecting to the database:', error);
});

// app.listen(80, () => {
//     connectToDatabase();
//     console.log('Server is listening on http://localhost:80')
// });