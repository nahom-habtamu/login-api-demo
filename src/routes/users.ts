import express, { Router , Request, Response } from 'express';
import _ from 'lodash';
import { User, userValidationSchema } from '../models/User';

const router : Router = express.Router();

router.post('/', async (req : Request, res : Response) => {
    try {
        
        validateRequestBody(req.body);
        await checkDuplicate(req.body.email);

        const user = new User({
            email : req.body.email,
            password : req.body.password
        });

        const createdUser = await user.save();

        const token = createdUser.generateAuthToken();
        res.status(201).send(token);
    } 

    catch (error : any) {
        res.status(400).send(error.message);
    }
});



interface ReqBody {
    email : string,
    password : string
}

const validateRequestBody = (requestBody : ReqBody) => {

    const { error } = userValidationSchema.validate(requestBody);

    if(error){
        throw new Error(error.message);
    }

}   


const checkDuplicate = async (email : string) => {

    const existingUser = await User.findOne({ email : email});
    if(existingUser?.email){
        throw new Error("User With That Email Already Exists");
    }
};


export default router;