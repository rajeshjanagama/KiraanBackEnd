const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


const addFirm = async (req, res) => {
    try {
        const { shopName, address,offer } = req.body;


        const image = req.file ? req.file.filename : undefined;


        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(400).json({ error: "Vendor not found" });
        }

        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "vendor can have only one firm" });
        }
 


        const firm = new Firm({
            shopName,
            address,
            offer,
            vendor: vendor._id,
            image 
        });

        
        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm)
        await vendor.save()


        const vendorName = vendor.userName;
        const firmId = firm._id

        res.status(200).json({ message: `Firm added successfully to the Vendor ${vendorName}`, firm, firmId });
        console.log("Firm added successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }

        res.status(200).json({message:"Firm deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}



module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById };

