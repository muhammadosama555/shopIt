const Product=require("../models/product")
const dotenv= require("dotenv")
const connectDatabase=require("../config/database.js")

const products= require("../data/product.json")

//Setting dotenv file
dotenv.config({path: "config/config.env"})

connectDatabase();


const seedProducts =  async ()=>{
    try {

        await Product.deleteMany();
        console.log("products are deleted")
        
        await Product.insertMany(products)
        console.log("All products are added")
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedProducts()