const express = require('express');
const firmController = require('../controllers/firmController');
const TokenVerify = require('../middleware/TokenVerify');

const router = express.Router();

router.post('/addfirm', TokenVerify, firmController.addFirm);

router.delete('/:firmId', firmController.deleteFirmById);
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});


module.exports = router;  