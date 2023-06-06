import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index')
})

router.get('/docs', (req, res) => {
    res.render('pages/docs')
})

router.get('/about', (req, res) => {
    res.render('pages/about')
})

router.get('/notfound', (req, res) => {
    res.render('pages/notfound')
})
export default router;