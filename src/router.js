const { Router } = require('express');
const router = Router();

router.get('/', require('./controllers/index'));
router.get('/people', require('./controllers/people').index);

module.exports = router