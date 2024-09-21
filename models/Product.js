const mongoose = require('mongoose');



const ProductSchema = new mongoose.Schema({
    
    productName:{
        type: String,
        required: true,
    },
    price:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true

    },
    bestSeller: {
        type: Boolean
    },
    image:{
        type:String,
    },
    count:{
        type: Number,
        required : true
    },
    category:{
        type: [String],
        enum:["General", "Fruits", "Dairy", "Snakes"]
    },
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]

});



const Product = mongoose.model('Product',ProductSchema);
module.exports = Product;