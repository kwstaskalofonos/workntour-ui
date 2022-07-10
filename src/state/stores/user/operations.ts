import {
    Company,
    CompanyHostProfile,
    Individual, IndividualHostProfile,
    LoginForm, Role,
    Traveler,
    TravelerProfile
} from "@src/state/stores/user/models";
import {GenericResponse, get, post} from "@src/utilities/fetch";
import {toast} from "react-toastify";
import {getCookie, setCookie} from "@src/utilities/cookies";

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

export const retrieveTravelerProfile = ():Promise<GenericResponse>=>{
    return new Promise<GenericResponse>((resolve,reject)=>{
        get('retrieveProfile/traveler')
            .then((response:GenericResponse)=>{
                setCookie(JSON.stringify(response.data),15,'profile');
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveIndividualProfile = ():Promise<GenericResponse>=>{
    return new Promise<GenericResponse>((resolve,reject)=>{
        get('retrieveProfile/individualHost')
            .then((response:GenericResponse)=>{
                setCookie(JSON.stringify(response.data),15,'profile');
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveCompanyProfile = ():Promise<GenericResponse>=>{
    return new Promise<GenericResponse>((resolve,reject)=>{
        get('retrieveProfile/companyHost')
            .then((response:GenericResponse)=>{
                setCookie(JSON.stringify(response.data),15,'profile');
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveUserProfile = ():Promise<void>=>{
    return new Promise<void>(()=>{
        switch (getCookie('role')){
            case Role.TRAVELER.valueOf():{
                // @ts-ignore
                retrieveTravelerProfile();
                break;
            }
            case Role.COMPANY_HOST.valueOf():{
                // @ts-ignore
                retrieveCompanyProfile();
                break;
            }
            case Role.INDIVIDUAL_HOST.valueOf():{
                // @ts-ignore
                retrieveIndividualProfile();
                break;
            }
        }
    })
}