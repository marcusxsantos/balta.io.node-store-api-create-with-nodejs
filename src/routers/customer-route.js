'use strict'

const express = require('express');
const controller = require('../controllers/customer-controller');
const router = express.Router();

router.post('/authenticate', controller.authenticate);
router.post('/', controller.post);

module.exports = router;