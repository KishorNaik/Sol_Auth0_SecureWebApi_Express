console.log("Program is running");

import * as dotenv from "dotenv";
import express,{ Request,Response,NextFunction} from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { AuthTokenBody, TokenGenerateAsync, tokenTest } from "./Utility/TokenGenerate";
import { AuthJwt } from "./JwtMiddlewares/JwtMiddleware";


console.log("Directory Path:",__dirname);
dotenv.config({ path: __dirname+'/.env' });

const app=express();
const port=process.env.PORT;

// Json Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// Security middleware
app.use(helmet()); 


app.listen(port,()=>{
    console.log(`Node server is running on this port ${port}`);
})


// api

//http://localhost:3000/api/user/login
app.post("/api/user/login",
            async (request:Request,response:Response,next:NextFunction)=>{
            
            const {username,password}=request.body;

            if(username==="test1" && password==="test1"){

                let tokenBody:AuthTokenBody=await TokenGenerateAsync();

                response.status(200).json(tokenBody);
            }
            else
            {
                response.status(200).json({Error:"Username and password is wrong"});
            }
});

http://localhost:3000/api/user/getdata
app.post("/api/user/getdata",AuthJwt(),(request:Request,response:Response,next:NextFunction)=>{

    response.status(200).json("Private Data");

});


