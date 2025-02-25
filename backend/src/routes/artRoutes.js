const express = require('express');
const router = express.Router();
const { getArtById, getAllAvailableArt } = require('../controllers/artController');

router.get('/', getAllAvailableArt);
router.get('/:id', getArtById);

module.exports = router;
