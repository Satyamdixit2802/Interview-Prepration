import mongoose from 'mongoose'

const connection = async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            retryWrites: true,
            w: 'majority'
        })
        console.log("MongoDB connection secured")
        return true
    }
    catch(error) {
        console.error("MongoDB Connection Error:", error.message)
        process.exit(1)
    }
}

export default connection