const mongoose=require("mongoose")

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true,
        maxLength:[100,"product name cannot exceed 100 characters"]
    },
    
    price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[100,"product name cannot exceed 5 letters"],
        default: 0.0

    },
    description:{
        type:String,
        required:[true,"please enter product description"],
        },
    averageRating:{
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
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Review'
            }
        ],
        category:{
            type: String,
            required:true,
            enum: [
                    "Electronics",
                    "Cameras",
                    "Laptops",
                    "Food",
                    "Headphones",
                    "Books",
                    "Clothes",
                    "Sports",
                    "Accessories"
                ],
            
        },
        stock:{
            type:Number,
            required: [true, "Please enter product  stock "],
            maxLength: [5,"product name cannot exceed 5 letters"],
            default:0
        },
       
        createdAt:{
            type: Date,
            default: Date.now
        }
})



module.exports= mongoose.model("Product",productSchema)