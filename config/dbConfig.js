import mongoose from "mongoose"
import * as dotenv from "dotenv";
dotenv.config();

mongoose.set('strict', false);


export default async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log('mongodb connected successfully ')
        })
        connection.on("error",()=>{
            console.log("mongodb failed to connect ")
            process.exit()
        })
    }catch(error){
        console.log(error,' error in the db connection')
    }
}