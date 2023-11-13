const errorResponse = require("../utils/errorResponse.js");
const asyncHandler = require('../middlewares/asyncHandler.js');
const Product = require('../models/product.js');
const Review = require('../models/Review.js');
const ErrorResponse = require("../utils/errorResponse.js");
const jwt = require('jsonwebtoken');

// Get Reviews
// Route: GET /api/v1/reviews
// Access: Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  
        const reviews = await Review.find().populate({
            path: 'product',
            select: 'name description'
        })

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
   
});

// Get Single Review
// Route: GET /api/v1/reviews/:id
// Access: Public

exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'product',
        select: 'name description'
    })
    if (!review) {
        return next(new errorResponse('No review found with the provided ID', 404));
    }
    res.status(200).json({
        success: true,
        data: review
    });
});

// Add Review
// Route: POST /api/v1/business/:businessId/reviews
// Access: Private

exports.addReview = asyncHandler(async (req, res, next) => {
    const { title, text, rating, productId } = req.body;

  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  // If the authorization header doesn't exist, return an error
  if (!authHeader) {
      return next(new ErrorResponse('Authorization header missing', 401));
  }
  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  // Verify the token to get the user ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;

   // Check if the user has already reviewed the product
   const existingReview = await Review.findOne({ product: productId, user: userId });
   if (existingReview) {
       return next(new ErrorResponse('You have already reviewed this product', 400));
   }


  const product = await Product.findById(productId);
  if (!product) {
      return next(new ErrorResponse('Product not found', 404));
  }


  const review = new Review({
      title,
      text,
      rating,
      user: userId,
      product: productId
  });
// Save the new review to the database
await review.save();
   // Push the review ID to the business's review array
   product.reviews.push(review._id);



   await product.save();

   

    res.status(201).json({
        success: true,
        data: review
    });
});

// Update Review
// Route: PUT /api/v1/reviews/:id
// Access: Private

exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

  

    if (!review) {
        return next(new ErrorResponse('No review found with the provided ID', 404));
    }

    

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    res.status(200).json({
        success: true,
        data: review
    });
});

// Delete Review
// Route: DELETE /api/v1/reviews/:id
// Access: Private

exports.deleteReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse('No review found with the provided ID', 404));
    }

    // Get the product associated with the review
    const product = await Product.findById(review.product);

    if (!product) {
        return next(new ErrorResponse('Product not found', 404));
    }

    // Remove the review ID from the product's reviews array
    product.reviews = product.reviews.filter((reviewId) => reviewId.toString() !== req.params.id);

    // Save the updated product
    await product.save();

    // Delete the review from the database
    await review.remove();

    res.status(200).json({
        success: true,
        message: "Review successfully deleted"
    });
});
