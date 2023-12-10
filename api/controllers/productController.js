const Product = require('../models/product');
const Review = require('../models/Review.js');
const asyncHandler=require('../middlewares/asyncHandler')
const ErrorResponse= require("../utils/errorResponse")
const jwt = require('jsonwebtoken');
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");


// Create a New Product
exports.newProduct = asyncHandler(async (req, res, next) => {
  const { name, description, price, category, stock } = req.body;
  
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
    
    const images = [];
   
    if (req.files) {
        for (const file of req.files) {
            const processedImage = await sharp(file.buffer)
                .resize(500, 500)
                .jpeg({ quality: 70 })
                .toBuffer();

            const dataURI = `data:image/jpeg;base64,${processedImage.toString('base64')}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'image',
                format: 'jpg',
                public_id: `${userId}_${Date.now()}`,
            });

            images.push({ public_id: result.public_id, url: result.secure_url });
        }
    }
  console.log(images)

    const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        images, // Use the Cloudinary URL here
      });
    
    
    const savedProduct = await product.save();
  

  res.status(201).json({
    success: true,
    product: savedProduct,
  });
});

// Get All Products
exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const { category, search, sortBy, page, limit, maxRating } = req.query;
  
    // Parse page and limit parameters
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 4;
    const skip = (parsedPage - 1) * parsedLimit;
  
    let query = Product.find();
  
    if (category) {
        // Filter products by the selected category
        query = query.where({ category: category });
    }
  
  if (search) {
    query = query.find({ name: { $regex: search, $options: 'i' } });
  }
  

    if (maxRating) {
      // Filter businesses with a maximum rating
      query = query.where({
        'averageRating': { $lte: parseInt(maxRating) }
      });
    }
  
    let sortOptions = {};
  
    if (sortBy === 'name') {
      sortOptions.name= 1;
    } else if (sortBy === '-name') {
      sortOptions.name = -1;
    }
  
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / parsedLimit);
  
    query = query.sort(sortOptions).skip(skip).limit(parsedLimit) .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username imgUrl', // Select the fields you want to populate
      }
    });
  
    const products = await query.exec();
  
    const pagination = {};
  
    if (skip > 0) {
      pagination.previous = {
        page: parsedPage - 1,
        limit: parsedLimit,
      };
    }
  
    if (skip + parsedLimit < totalProducts) {
      pagination.next = {
        page: parsedPage + 1,
        limit: parsedLimit,
      };
    }
  
    res.status(200).json({
      success: true,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalProducts,
      pagination,
      products,
    });
  });
  

// Get Single Product
exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id) .populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'username imgUrl', // Select the fields you want to populate
    }
  });

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;

  // Find the product and its associated reviews
  const product = await Product.findById(productId).populate('reviews');

  if (!product) {
    return next(new ErrorResponse('Product not found', 404));
  }

  // Delete the associated reviews
  for (const review of product.reviews) {
    await Review.findByIdAndDelete(review._id);
  }

  // Remove the product
  await product.remove();

  res.status(200).json({
    success: true,
    message: 'Product and its reviews deleted',
  });
});

