import config from '../config';
import jwt from 'jsonwebtoken';


function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).send('Access Denied. Found 0 token');
    }

    try {
        const decoded = jwt.verify(token,config?.privateKey);
        req.user = decoded;
        next();
    } 
    catch (error) {
        return res.status(400).send(error.message)    
    }
}

export default auth;