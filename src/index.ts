import express, { Application, NextFunction , Request, Response } from 'express';
import morgan from 'morgan';

const app : Application = express();

import connect  from './connectToMongo';
import auth from './routes/auth';
import users from './routes/users';


var allowCrossDomain = function(req : Request, res : Response, next : NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
};


app.use(allowCrossDomain);

app.use(express.json());
app.use(morgan("combined"));


app.use('/api/auth',auth);
app.use('/api/users',users);


const port = process.env.PORT ?? 5000;

app.listen(port, () => {
    connect('AuthLearningDb');
    console.info("Server Running On Port : " + port);
});