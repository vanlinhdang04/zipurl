import express from 'express'
import connectToDatabase, {db} from '../config/database.js';

const router = express.Router();

router.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        if(db) {
            const result = await db.collection('list').findOne({shortUrl})
            res.redirect(result.url)
        } else {
            const {db: database} = await connectToDatabase();
            const result = await database.collection('list').findOne({shortUrl})
            res.redirect(result.url)
        }
    
    } catch (error) {
        console.log("error ", error)
        res.redirect('/notfound')        
    }
})

export default router;