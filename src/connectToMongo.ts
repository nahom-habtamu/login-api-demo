
import mongoose from 'mongoose';

export default async function(dbName : string){

    try {
        await mongoose.connect(`mongodb://localhost/${dbName}`);
        console.log("Connected To { " + dbName + " } database succesfully"); 
    } 
    catch (error : any) {
        console.log(error.message);
    }
};