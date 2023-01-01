const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(`you're using the api`);
});

router.get('/:text', (req, res) => {
    res.send(req.params.text.split('').reverse().join(''));
});

module.exports = router;