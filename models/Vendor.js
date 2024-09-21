const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type : String,
        required : true
    },
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'

        }
    ]
});

const Vendor = mongoose.model('Vendor',VendorSchema );
module.exports = Vendor;