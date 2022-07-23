import {Opportunity} from "@src/state/stores/opportunity/models";
import {GenericResponse, get, post, postMultipart} from "@src/utilities/fetch";
import {toast} from "react-toastify";


export const createOpportunity = (form:Opportunity,setIsLoading:any):Promise<Opportunity>=>{
    return new Promise<Opportunity>((resolve,reject)=>
        post('createNewOpportunity',form)
            .then((response:Opportunity)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

// export const createOpportunity = (form:Opportunity,setIsLoading:any,files:File[]):Promise<Opportunity>=>{
//     return new Promise<Opportunity>((resolve,reject)=>
//         postMultipart('createNewOpportunityWeb',form,files)
//             .then((response:Opportunity)=>{
//                 resolve(response);
//             }).catch((error)=>{
//             toast.error(error,{position:toast.POSITION.TOP_RIGHT});
//             reject(error);
//         }).finally(()=>setIsLoading(false))
//     )
// };

export const getOpportunities = (setIsLoading:any):Promise<GenericResponse>=>{
    return new Promise<GenericResponse>((resolve, reject)=>
        get('retrieveAllOpportunityByMemberId')
            .then((response:GenericResponse)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const getOpportunity = (opportunityId:string):Promise<GenericResponse>=>{
    return new Promise<GenericResponse>((resolve, reject)=>
        get('retrieveOpportunityBy/'+opportunityId)
            .then((response:GenericResponse)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};
