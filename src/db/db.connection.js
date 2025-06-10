import mongoose from "mongoose";

const connectDB = async (db_uri,db_name) => {
    try {
        const instance = await mongoose.connect(`${db_uri}/${db_name}`);
        if(instance){
            console.log(`DB connected at ${instance.connection.name}`);
            return;
        }
        exit(1)
    } catch (error) {
        console.error(error)
    }
} 

export default connectDB;