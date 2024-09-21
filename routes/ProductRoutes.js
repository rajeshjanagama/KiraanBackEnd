const express = require('express');
const path = require('path');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/addproduct/:id', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);
router.delete('/:productId', productController.deleteProductById);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});




module.exports = router; 