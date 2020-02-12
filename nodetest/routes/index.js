const express = require('express');
const member = require('./member');
const survey = require('./survey');

const router = express.Router();

router.use('/member',member);
router.use('/survey',survey);

module.exports = router;
