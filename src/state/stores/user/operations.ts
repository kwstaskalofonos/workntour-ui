import {
    Company,
    CompanyHostProfile,
    Individual, IndividualHostProfile,
    LoginForm,
    Traveler,
    TravelerProfile
} from "@src/state/stores/user/models";
import {get, post} from "@src/utilities/fetch";
import {toast} from "react-toastify";
import {setCookie} from "@src/utilities/cookies";

export const registerAsTraveler = (form:Traveler,setIsLoading:any):Promise<Traveler>=>{
    return new Promise<Traveler>((resolve,reject)=>
        post('registration/traveler',form)
            .then((response:Traveler)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const registerAsIndividual = (form:Individual,setIsLoading:any):Promise<Individual>=>{
    return new Promise<Individual>((resolve,reject)=>
        post('registration/host/individual',form)
            .then((response:Individual)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const registerAsCompany = (form:Company,setIsLoading:any):Promise<Company>=>{
    return new Promise<Company>((resolve,reject)=>
        post('registration/host/company',form)
            .then((response:Company)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const retrieveTravelerProfile = (memberId:string):Promise<TravelerProfile>=>{
    return new Promise<TravelerProfile>((resolve,reject)=>{
        get('retrieveProfile/traveler')
            .then((response:TravelerProfile)=>{
                setCookie(JSON.stringify(response),15,'profile');
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveIndividualProfile = (memberId:string):Promise<IndividualHostProfile>=>{
    return new Promise<IndividualHostProfile>((resolve,reject)=>{
        get('retrieveProfile/individualHost')
            .then((response:IndividualHostProfile)=>{
                setCookie(JSON.stringify(response),15,'profile');
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveCompanyProfile = (memberId:string):Promise<CompanyHostProfile>=>{
    return new Promise<CompanyHostProfile>((resolve,reject)=>{
        get('retrieveProfile/companyHost')
            .then((response:CompanyHostProfile)=>{
                setCookie(JSON.stringify(response),15,'profile');
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}