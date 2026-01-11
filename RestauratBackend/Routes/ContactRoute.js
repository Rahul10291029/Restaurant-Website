const express = require('express');
const router = express.Router(); // Make sure to use express.Router()
const contactController = require('../Controller/ContactController');

router.post('/', contactController.submitContactForm);
router.get('/', contactController.getAllContacts);

module.exports = router;