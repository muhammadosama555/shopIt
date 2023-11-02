const express= require('express')

const router=express.Router({mergeParams: true})

const {protect, authorize}=require('../middlewares/auth')
const { getReviews, getReview, addReview, updateReview, deleteReview } = require('../controllers/reviewController')

router.get('/',getReviews)
router.post('/',protect,addReview)
router.put('/:id',protect,updateReview)
router.delete('/:id',protect,deleteReview)
router.get('/:id',getReview)

module.exports=router

