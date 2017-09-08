const express = require('express');
const verificationController = require('../controllers/verification');
const messageWebhookController = require('../controllers/messageWebhook');

const router = express.Router();

router.get('/', verificationController);
router.post('/', messageWebhookController);

module.exports = router;
