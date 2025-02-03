const express = require('express');
const { handleCodeEdit } = require('../services/collaborationService');

const router = express.Router();

router.post('/edit', async (req, res) => {
    try {
        await handleCodeEdit(req.body);
        res.status(200).json({ message: 'Edit recorded' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process edit' });
    }
});

module.exports = router;
