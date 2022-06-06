import {Traveler} from "@src/state/stores/user/models";
import {post} from "@src/utilities/fetch";

export const registerAsTraveler = (form:Traveler,setIsLoading:any):Promise<Traveler>=>{
    return new Promise<Traveler>((resolve,reject)=>
        post('registration/traveler',form)
            .then((response:Traveler)=>{
                resolve(response);
            }).catch((error)=>{
                reject(error);
        }).finally(()=>setIsLoading(false))
    )
};