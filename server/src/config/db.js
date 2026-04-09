import mongoose from 'mongoose'

const connection = async function connectDB () {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connection secured")
    }
    catch(error) {
        console.log(error)
    }
}

export default connection