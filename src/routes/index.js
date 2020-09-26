const router = require('express').Router();
const itemsService = require('../services/items');

router.get('/api/items/:id?', itemsService);

module.exports = router;