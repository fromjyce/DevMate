const express = require('express');
const { logUserActivity } = require('../controllers/activityController');

const router = express.Router();

router.post('/log-activity', logUserActivity);

module.exports = router;
