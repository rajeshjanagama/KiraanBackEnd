const vendorController = require('../controllers/vendorController');
const express = require('express');


const router = express.Router();

router.post('/registration', vendorController.VendorRegistration);
router.post('/login', vendorController.vendorLogin);
router.get('/allvendors', vendorController.allVendors);
router.get('/single/:id', vendorController.getSingleVendor);

module.exports = router;