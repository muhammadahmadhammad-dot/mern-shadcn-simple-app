import mongoose from 'mongoose';

const connectionWithDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.DB_URL) 
        console.log('MongoDB is Connected'+ conn.connection.host)
    } catch (error) {
        console.log('MongoDB connection error : ' + error);
        
    }
}    
export default connectionWithDB