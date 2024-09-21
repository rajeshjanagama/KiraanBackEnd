
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
dotEnv.config();

const secretkey = process.env.secretkey;

const VendorRegistration = async(req, res)=>{
    const {userName, phoneNumber, email, password} = req.body;

    try{
        const vendorEmail = await Vendor.findOne({email});
        
        if (vendorEmail){
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedpassword = await bcrypt.hash(password,10);


        const newVendor = new Vendor({
            userName,
            phoneNumber,
            email,
            password: hashedpassword
        });

        await newVendor.save();
        const vendorName = newVendor.userName

        res.status(200).json({ message: "Vendor registered successfully", vendorName });
        console.log("Registered Successfully");

    }catch(error){
        res.status(500).json({ error: "Server Error" });
        console.error(error);
    }

}


const vendorLogin = async(req, res)=>{
    const {email, password} = req.body;

    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || (! bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error: "Invalid username or password"});
        }
        const token = jwt.sign({vendorId: vendor._id}, secretkey, {expiresIn: "1h"});

        const vendorName = vendor.userName
        const vendorId = vendor._id;

        res.status(200).json({message: "Vendor Login successfully",vendorName,vendorId, token});
        console.log("Vendor login successfully");

    }catch(error){
        res.status(500).json({ error: "Error" });
        console.error(error);

    }
}

const allVendors = async(req,res)=>{
    try {

        const alldata = await Vendor.find().populate('firm');
        res.json({alldata});
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log("Internal server error");
    }
}

const getSingleVendor = async(req,res)=>{
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }
        const vendorFirmId = vendor.firm[0]._id;
        const ShopName = vendor.firm[0].shopName;
        
        res.status(200).json({vendor,vendorFirmId,ShopName})
        
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
        console.log("Internal server error");
    }
}
module.exports = {VendorRegistration, vendorLogin,allVendors,getSingleVendor};