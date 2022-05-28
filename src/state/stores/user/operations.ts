import {Traveler} from "@src/state/stores/user/models";
import {post} from "@src/utilities/fetch";
import {toast} from "react-toastify";

export const registerAsTraveler = (form:Traveler,setIsLoading:any):Promise<Traveler>=>{
    return new Promise<Traveler>((resolve,reject)=>
        post('registration/traveler',form)
            .then((response:Traveler)=>{
                toast.success("Success Registration",{
                    position:toast.POSITION.TOP_RIGHT
                })
                resolve(response);
            }).catch((error)=>{
                toast.error(error,{
                    position:toast.POSITION.TOP_RIGHT
                })
                reject(error);
        }).finally(()=>setIsLoading(false))
    )
};