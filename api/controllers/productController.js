exports.getProducts=(req,res,next)=>{
    res.status(200).json({
        seccess: true,
        mesage: "this route will show all products"
    })
}