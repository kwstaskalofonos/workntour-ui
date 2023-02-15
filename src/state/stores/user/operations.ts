import {
    Company,
    CompanyHostProfileDto,
    Individual, IndividualHostProfileDto,
    LoginForm, Role,
    Traveler,
    TravelerProfileDTO
} from "@src/state/stores/user/models";
import {GenericResponse, get, post, postMultipart} from "@src/utilities/fetch";
import {toast} from "react-toastify";
import {getCookie, setCookie} from "@src/utilities/cookies";
import {ThunkAction} from "redux-thunk";
import {RootState} from "@src/state/store";
import {ActionCreator} from "@reduxjs/toolkit";
import {authenticationSlice} from "@src/state/stores/user/reducers";
import {SessionStorage} from "@src/utilities/localStorage";

type ThunkResult = ThunkAction<void, RootState, undefined, any>;

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

export const retrieveTravelerProfile = ():Promise<TravelerProfileDTO>=>{
    return new Promise<TravelerProfileDTO>((resolve, reject)=>{
        get('profile/retrieveProfile/traveler')
            .then((response:TravelerProfileDTO)=>{
                SessionStorage.setItem('profile',response,900000);
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveIndividualProfile = ():Promise<IndividualHostProfileDto>=>{
    return new Promise<IndividualHostProfileDto>((resolve,reject)=>{
        get('profile/retrieveProfile/individualHost')
            .then((response:IndividualHostProfileDto)=>{
                SessionStorage.setItem('profile',response,900000);
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        })
    })
}

export const retrieveCompanyProfile = ():Promise<CompanyHostProfileDto>=>{
    return new Promise<CompanyHostProfileDto>((resolve,reject)=>{
        get('profile/retrieveProfile/companyHost')
            .then((response:CompanyHostProfileDto)=>{
                SessionStorage.setItem('profile',response,900000);
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

export const doSetRole: ActionCreator<ThunkResult> = (role:string) =>
    (dispatch) =>{
        return new Promise<void>(()=>{
            dispatch(authenticationSlice.actions.setRole({role:role}))
        })
    }

export const doSetProfile: ActionCreator<ThunkResult> = (profile:TravelerProfileDTO|IndividualHostProfileDto|CompanyHostProfileDto) =>
    (dispatch) =>{
        return new Promise<void>(()=>{
            dispatch(authenticationSlice.actions.setProfile({profile:profile}))
        })
    }

export const updateUserInfo: ActionCreator<ThunkResult> = (role:string) =>
    (dispatch) =>{
        return new Promise<void>(()=>{
            switch (role){
                case Role.TRAVELER.valueOf():{
                    retrieveTravelerProfile()
                        .then((response)=>{
                            dispatch(authenticationSlice.actions.setProfile({profile:response}));
                        });
                    break;
                }
                case Role.COMPANY_HOST.valueOf():{
                    retrieveCompanyProfile()
                        .then((response)=>{
                            dispatch(authenticationSlice.actions.setProfile({profile:response}));
                        });
                    break;
                }
                case Role.INDIVIDUAL_HOST.valueOf():{
                    retrieveIndividualProfile()
                        .then((response)=>{
                            dispatch(authenticationSlice.actions.setProfile({profile:response}));
                        });
                    break;
                }
            }
        })
    }


export const updateTravelerProfile:ActionCreator<ThunkResult>= (data:FormData,setIsLoading:any,setFile:any)=>
    (dispatch) =>{
        return new Promise<TravelerProfileDTO>((resolve, reject)=>{
            postMultipart('profile/updateProfile/traveler',data,'PUT')
                .then((response:TravelerProfileDTO)=>{
                    SessionStorage.setItem('profile',response,900000);
                    dispatch(authenticationSlice.actions.setProfile({profile:response}));
                    resolve(response);
                    setIsLoading(false);
                    setFile();
                    toast.success("Profile updated",{position:toast.POSITION.TOP_RIGHT});
                }).catch((error)=>{
                toast.error(error,{position:toast.POSITION.TOP_RIGHT});
                setIsLoading(false);
                reject(error);
            })
        })
    }

export const updateCompanyProfile:ActionCreator<ThunkResult>= (data:FormData,setIsLoading:any,setFile:any)=>
    (dispatch) =>{
        return new Promise<CompanyHostProfileDto>((resolve,reject)=>{
            postMultipart('profile/updateProfile/companyHost',data,'PUT')
                .then((response:CompanyHostProfileDto)=>{
                    SessionStorage.setItem('profile',response,900000);
                    dispatch(authenticationSlice.actions.setProfile({profile:response}));
                    resolve(response);
                    setIsLoading(false);
                    setFile();
                    toast.success("Profile updated",{position:toast.POSITION.TOP_RIGHT});
                }).catch((error)=>{
                toast.error(error,{position:toast.POSITION.TOP_RIGHT});
                setIsLoading(false);
                reject(error);
            })
        })
    }

export const updateIndividualProfile:ActionCreator<ThunkResult>= (data:FormData,setIsLoading:any,setFile:any)=>
    (dispatch) =>{
        return new Promise<IndividualHostProfileDto>((resolve,reject)=>{
            postMultipart('profile/updateProfile/individualHost',data,'PUT')
                .then((response:IndividualHostProfileDto)=>{
                    SessionStorage.setItem('profile',response,900000);
                    dispatch(authenticationSlice.actions.setProfile({profile:response}));
                    resolve(response);
                    setIsLoading(false);
                    setFile();
                    toast.success("Profile updated",{position:toast.POSITION.TOP_RIGHT});
                }).catch((error)=>{
                toast.error(error,{position:toast.POSITION.TOP_RIGHT});
                setIsLoading(false);
                reject(error);
            })
        })
    }

