import {Constants} from "@src/utilities/constants";

interface GenericResponse{
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

export function get<T>(uri: string):Promise<T | any>{
    return new Promise((resolve, reject)=>fetch(Constants.getApiUrl()+uri,headers('GET'))
        .then(parseResponse)
        .then((response:GenericResponse)=>{
            if(response.ok){
                return resolve(response.data);
            }

            return reject(response.error);
        }).catch((error)=>reject(networkErrorResponse(error)))
    )
}

export async function post<T>(uri: string,data:any): Promise<T | any>{
    return new Promise((resolve,reject)=>fetch(Constants.getApiUrl()+uri,headers('POST',data))
        .then(parseResponse)
        .then((response:GenericResponse)=>{
            if(response.ok){
                return resolve(response.data);
            }
            return reject(response.error);
        }).catch((error)=>reject(networkErrorResponse(error)))
    )
}

function parseResponse(response:Response): Promise<GenericResponse>{
    return new Promise((resolve,reject)=>{
        response.json()
            .then((json:any)=>{
                if(response.status === 201){
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

function headers(method:string,data?:any):RequestInit{
    const customHeaders = new Headers();
    return {
        body:JSON.stringify(data),
        headers:new Headers(
            {'content-type':'application/json',
                'accept':'application/json'}),
        method:method,
        mode:'cors',
    }
}