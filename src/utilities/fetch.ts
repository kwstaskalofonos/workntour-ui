import {Constants} from "@src/utilities/constants";
import {LoginResponse} from "@src/state/stores/user/models";
import {toast} from "react-toastify";
import {getCookie, hasCookie} from "@src/utilities/cookies";

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

export async function del<T>(uri: string,data?:any): Promise<T | any>{
    return new Promise((resolve,reject)=>fetch(Constants.getApiUrl()+uri,headers('DELETE',data))
        .then(parseResponse)
        .then((response:GenericResponse)=>{
            if(response.ok){
                return resolve(response.data);
            }
            return reject(response.error);
        }).catch((error)=>reject(networkErrorResponse(error)))
    )
}

export async function postMultipart<T>(uri: string,data:any,files:File[]): Promise<T | any>{
    return new Promise((resolve,reject)=>fetch(Constants.getApiUrl()+uri,multipartHeaders(data,files))
        .then(parseResponse)
        .then((response:GenericResponse)=>{
            if(response.ok){
                return resolve(response.data);
            }
            return reject(response.error);
        }).catch((error)=>reject(networkErrorResponse(error)))
    )
}

export function login<T>(email:string,password:string):Promise<T | any>{
    return new Promise((resolve, reject)=>fetch(Constants.getApiUrl()+"login",headers('POST',null,email,password))
        .then(parseResponse)
        .then((response:GenericResponse)=>{
            if(response.ok){
                toast.success("Logged in succesfully",{position:toast.POSITION.TOP_RIGHT});
                return resolve(response.data);
            }
            return reject(response.error);
        }).catch(((error)=>reject(networkErrorResponse(error)))
    ))
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
                        data:json.data,
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
    const customHeaders = new Headers({'content-type':'application/json',
        'accept':'application/json',
        'email':email?email:'',
        'password':password?password:''});
    if(hasCookie('workntour')){
        customHeaders.set('memberId',getCookie('workntour'))}
    return {
        body:JSON.stringify(data),
        headers:customHeaders,
        method:method,
        redirect:"follow",
        credentials:"include",
        mode:'same',
    }
}

function multipartHeaders(data:any,files:File[]):RequestInit{
    // const customHeaders = new Headers({'content-type':'multipart/form-data',
    //     'accept':'application/json'});
    const customHeaders = new Headers();
    // const customHeaders = new Headers({'content-type':'false'});
    if(hasCookie('workntour')){
        customHeaders.set('memberId',getCookie('workntour'))}
    let formData = new FormData();
    formData.append("newOpportunity",data);
    let i=0;
    for(let file of files){
        formData.append("images",file,file.name);
    }
    return {
        body:formData,
        headers:customHeaders,
        method:'POST',
        mode:'cors',
    }
}