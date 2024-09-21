const mongoose = require('mongoose');

const FirmSchema = new mongoose.Schema({
    shopName:{
        type : String,
        required: true,
    },

    address : {
        type: String,
        required : true
    },

    offer: {
        type: String
    },
    image:{
        type: String
    },
    vendor:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'

        }
    ],
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'

        }
    ]

})

const Firm = mongoose.model('Firm',FirmSchema);
module.exports = Firm;

