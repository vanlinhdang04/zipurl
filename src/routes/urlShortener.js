import express from 'express'
import connectToDatabase from '../config/database.js';
import {db} from '../config/database.js';

import {generateShortUrl} from '../utils/generateShortUrl.js'

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { url } = req.body;
        console.log("url", url)
        
        const shortUrl = generateShortUrl(url)
        const newDoc = {
            shortUrl,
            url
        }
    
        const {db, client} = await connectToDatabase();
        const collection = db.collection('list');
        const result = collection.updateOne({[shortUrl]: shortUrl}, {$set: {
            shortUrl: shortUrl,
            url: url
        }}, {upsert: true});
        res.status(201).json({shortUrl: req.hostname+"/r/"+shortUrl})
    } catch (error) {
        next(error);

        // res.status(500).json({
        //     error: "Failed to Shortener"
        // })
    }
})

export default router;