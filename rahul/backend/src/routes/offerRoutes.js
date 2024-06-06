const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/offers', offerController.getOffers);
router.get('/offers/:id', offerController.getOfferById);
router.post('/offers', offerController.createOffer);
router.put('/offers/:id', offerController.updateOffer);
router.delete('/offers/:id', offerController.deleteOffer);

module.exports = router;
