import express, { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';


import { User, userValidationSchema } from '../models/User';

const router : Router = express.Router();


router.post('/', async (req : Request ,res : Response) => {

    try {
        
        const { error } = userValidationSchema.validate(req.body);
    
        if(error){
            throw new Error(error.message);
        }
        else {  

            const user = await User.findOne({ email : req.body.email });
            if(!user){
                throw new Error("No User Found");
            }

            const checkedPassword : boolean = await bcrypt.compare(req.body.password, user.password);

            if(!checkedPassword){
                throw new Error('Incorrect Password');
            }

            const token = user.generateAuthToken();
            res.status(200).send(token);

        }    
    }

    catch (error : any) {
        res.status(400).send(error.message);    
    }

});


export default router;