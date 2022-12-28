const mongoose=require("mongoose")

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_UR,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        
    }).then(con =>{
        console.log(`MongoDb Database connected with Host:${con.connection.host}`)
    })
}

module.exports= connectDatabase