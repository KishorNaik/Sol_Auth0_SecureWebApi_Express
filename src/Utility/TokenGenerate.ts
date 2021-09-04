import request from "request";

type Auth0ClientInfo={
    client_id?:string;
    client_secret?:string;
    audience?:string;
    grant_type?:string
}

type RequestOptions={
    method:string;
    url:string;
    headers:object;
    body:string
};

export interface AuthTokenBody{
    access_token:string;
    expires_in:number;
    token_type:string
};


export const TokenGenerateAsync=():Promise<AuthTokenBody>=>{

    const auth0ClientInfo:Auth0ClientInfo={
        client_id:process.env.CLIENT_ID,
        client_secret:process.env.CLIENT_SECRET,
        audience:process.env.AUTH0_AUDIENCE,
        grant_type:"client_credentials"
    };

    const requestOptions:RequestOptions={
        method:"POST",
        url:process.env.AUTH_URL,
        headers:{'content-type': 'application/json'},
        body:JSON.stringify(auth0ClientInfo)
    }

    let promiseToken:Promise<AuthTokenBody>;

    return new Promise((resolve,reject)=>{
        try
        {
            request(requestOptions,(error,response,body)=>{
                if (error) throw new Error(error);
                   
                    let tokenBody:AuthTokenBody=JSON.parse(body);
                    resolve(tokenBody);
                });
        }
        catch(ex){
            reject(ex);
            throw ex;
        }
    })
    
    
    return promiseToken;
}