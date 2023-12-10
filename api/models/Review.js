const mongoose=require('mongoose')
const Product = require('./product.js');


const ReviewSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'please enter review title']
    },
    text:{
        type:String,
        required:[true,'please enter some text']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'please add a rating']
    },
   
    createdAt: {
        type:Date,
        default:Date.now 
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref: 'Product',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
})




// Define a post middleware to update the average rating when a review is added, updated, or deleted
ReviewSchema.post(['save', 'findOneAndUpdate', 'remove'], async function (doc) {
    const product = await Product.findById(doc.product);
    if (!product) {
      return;
    }
  
    const reviews = await this.model('Review').find({ product: doc.product });
    if (reviews.length === 0) {
      product.averageRating = 0;
    } else {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      product.averageRating = totalRating / reviews.length;
    }
  
    await product.save();
  });

module.exports=mongoose.model('Review',ReviewSchema)