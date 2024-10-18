import mongoose from 'mongoose'

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '')
    } catch (error) {
        throw error
    }
}

export default ConnectDB