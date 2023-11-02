const express= require('express')
const upload = require("../middlewares/multer");
const { getAllUsers, getSingleUser, updateUser, updateUserImage, deleteUser } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');

const router=express.Router()

router.use(protect); // Protect the routes below for authenticated users


router.get('/',getAllUsers)
router.get('/:id',getSingleUser)
router.put('/:id',updateUser)
router.put('/update-user-image/:id',upload.single("image"), updateUserImage)
router.delete('/:id',deleteUser)


module.exports=router