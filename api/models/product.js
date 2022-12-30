const mongoose=require("mongoose")

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[100,"product name cannot exceed 100 characters"]
    },
    
    price:{
        type:String,
        required:[true,"please enter product price"],
        maxLength:[100,"product name cannot exceed 5 letters"],
        default: 0.0

    },
    desc:{
        type:String,
        required:[true,"please enter product description"],
        },
    rating:{
        type:Number,
        default:0
        },
        images: [
            {
                public_id:{
                    type:String,
                    required:true
                },
                url:{
                    type:String,
                    required:true
                },
            }
        ],
        category:{
            type:String,
            required:[true,"Please select the category"],
            enum:{
                values: [
                    "electronics",
                    "Cameras",
                    "laptops",
                    "food",
                    "Headphones",
                    "books",
                    "clothes",
                    "Sports"
                ],
                message: "please select correct category"
            }
        },
        seller:{
            type:String,
            required: [true, "Please enter product  seller "]
        },
        stock:{
            type:Number,
            required: [true, "Please enter product  stock "],
            maxLength: [5,"product name cannot exceed 5 letters"],
            default:0
        },
        numOfReviews:{
            type: Number,
            default:0
        },
        reviews:[
            {
                name:{
                    type:String,
                    required:true
                },
                rating:{
                    type:Number,
                    required:true
                },
                comment:{
                    type:String,
                    required:true
                },
            }
        ],
        createdAt:{
            type: Date,
            default: Date.now
        }
})



module.exports= mongoose.model("Product",productSchema)