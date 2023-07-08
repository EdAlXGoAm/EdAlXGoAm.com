import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'EdAlXGoAm'});
});

router.get('/api', (req, res) => {
    res.send('Welcome to my API!');
});

export default router;