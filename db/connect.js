import mongoose from "mongoose";
// const connectionString = 'mongodb+srv://websitetemplate:websitetemplate@websitetemplate.pox9jrl.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

const connectDB = async (url) => {
    return mongoose.connect(url)
}

export default connectDB