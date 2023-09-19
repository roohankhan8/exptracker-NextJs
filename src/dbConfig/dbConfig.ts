import mongoose, { connection, mongo } from "mongoose";

export async function connect() {
    try {
        mongoose.connect(`${process.env.MONGO_URL!}`)
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log("MongoDB connected")
        })
        connection.once('error',(err)=>{
            console.log('MongoDB error',err)
            process.exit()
        })
    } catch (error) {
        console.log('Something went wrong',error)
    }
}