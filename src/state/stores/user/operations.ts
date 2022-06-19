import {Company, Individual, Traveler} from "@src/state/stores/user/models";
import {post} from "@src/utilities/fetch";
import {toast} from "react-toastify";

export const registerAsTraveler = (form:Traveler,setIsLoading:any):Promise<Traveler>=>{
    return new Promise<Traveler>((resolve,reject)=>
        post('registration/traveler',form)
            .then((response:Traveler)=>{
                resolve(response);
            }).catch((error)=>{
                reject(error);
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
        }).finally(()=>setIsLoading(false))
    )
};

export const registerAsIndividual = (form:Individual,setIsLoading:any):Promise<Individual>=>{
    return new Promise<Individual>((resolve,reject)=>
        post('registration/host/individual',form)
            .then((response:Individual)=>{
                resolve(response);
            }).catch((error)=>{
            reject(error);
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
        }).finally(()=>setIsLoading(false))
    )
};

export const registerAsCompany = (form:Company,setIsLoading:any):Promise<Company>=>{
    return new Promise<Company>((resolve,reject)=>
        post('registration/host/individual',form)
            .then((response:Company)=>{
                resolve(response);
            }).catch((error)=>{
            reject(error);
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
        }).finally(()=>setIsLoading(false))
    )
};