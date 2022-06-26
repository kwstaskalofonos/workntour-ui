import {Constants} from "@src/utilities/constants";
import {toast} from "react-toastify";

export interface GenericResponse{
    ok:boolean,
    status:number,
    data:string,
    exceptions?:{
        total:number,
        errors:string[]
    },
    error?:string
}

const networkErrorResponse = (error:any)=>{
    return{
        status:error.status,
        ok:false,
        data:error.exceptions,
    }
}

export function subscribe<T>(email:string,setIsLoading:any):Promise<T | any>{
    return new Promise((resolve, reject)=>fetch(Constants.getApiUrl()+"earlySubscription",headers('POST',null,email))
        .then(parseResponse)
        .then((response:GenericResponse)=>{
            console.log(response);
            if(response.ok){
                setIsLoading(false);
                return resolve(response.data);
            }
            setIsLoading(false);
            return reject(response.error);
        }).catch(((error)=>reject(networkErrorResponse(error)))
        ))
}

function parseResponse(response:Response): Promise<GenericResponse>{
    return new Promise((resolve,reject)=>{
        response.json()
            .then((json:any)=>{
                if((response.status === 201)||(response.status === 200)){
                    resolve({
                        status:response.status,
                        data:json,
                        ok:response.ok,
                    })
                }else if (response.status === 400){
                    resolve({
                        status:response.status,
                        data:"",
                        ok:false,
                        exceptions:json.exceptions,
                        error:json.exceptions.errors[0].title
                    })
                } else if(response.status === 500){
                    resolve({
                        status:response.status,
                        data:"",
                        ok:false,
                        exceptions:json.exceptions,
                        error:json.exceptions.errors[0].title
                    })
                }
                else if (response.status === 409){
                    resolve({
                        status:response.status,
                        data:"",
                        ok:false,
                        exceptions:json.exceptions,
                        error:json.exceptions.errors[0].title
                    })
                }else{
                    resolve({
                        status:response.status,
                        data:"",
                        ok:false,
                        exceptions:json.exceptions,
                        error:json.exceptions.errors[0].title
                    })
                }
            })
    })
}

function headers(method:string,data?:any,email?:string,password?:string):RequestInit{
    const customHeaders = new Headers();
    return {
        body:JSON.stringify(data),
        headers:new Headers(
            {'content-type':'application/json',
                'accept':'application/json',
                'email':email?email:'',
                'password':password?password:''}),
        method:method,
        mode:'cors',
    }
}