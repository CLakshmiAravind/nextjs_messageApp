import mongoose from "mongoose";

type ConnectionObject ={
    isConnected ?: number
}

const conncetion : ConnectionObject={}

async function dbConnect() {
    if (conncetion.isConnected){
        console.log("Already DB is connected.");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        conncetion.isConnected = db.connections[0].readyState
        console.log("DB is connected now.");
        
    } catch (error) {
        console.log("DB connection failed -- ", error);
        process.exit(1)
    }
}

export default dbConnect;