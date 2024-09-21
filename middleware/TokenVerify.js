const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
const dotEnv = require('dotenv');
dotEnv.config()

const secretkey = process.env.secretkey;


const TokenVerify = async (req,res,next)=>{
    const token = req.headers.token;
    if (!token){
        return res.status(500).json({error:"Token required"});
    }

    try {

        const decoded = jwt.verify(token,secretkey);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor){
            return res.status(404).json({erroe:"Vendor does not exist!!!"})
        }
        

        req.vendorId = vendor._id;
        next()

        
    } catch (error) {
        res.status(500).json({ error: "Invalid Token" });
        console.error("Invalid token ");

    }
}

module.exports = TokenVerify;