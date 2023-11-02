const mongoose= require('mongoose')


const orderSchema = mongoose.Schema({
   shippingInfo:{
         address:{
            type: String,
            required:true
         },
         city:{
            type: String,
            required:true
         },
         phoneNo:{
            type: Number,
            required:true
         },
         postalCode:{
            type: Number,
            required:true
         },
         country:{
            type: String,
            required:true
         },
   },
   user: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "User" 
   },
   itemsOrderd: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
    ],
   totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    quantity:{
      type: Number,
      required: true,
    },   createdAt:{
    type: Date,
    default: Date.now
   }
})



module.exports= mongoose.model('Order',orderSchema)