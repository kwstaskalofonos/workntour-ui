import {post} from "@src/utilities/fetch";
import {toast} from "react-toastify";
import {HostHomeForm, TravelerHomeForm} from "@src/state/stores/subscriptions/models";
import {logEvent} from "firebase/analytics";
import {analytics} from "@src/utilities/firebase";
import {isDevServer} from "../../../../webpack/env";


export const subscribeAsTraveler = (form:TravelerHomeForm,setIsLoading:any):Promise<TravelerHomeForm>=>{
    return new Promise<TravelerHomeForm>((resolve,reject)=>
        post('home/traveler/form',form)
            .then((response:TravelerHomeForm)=>{
                resolve(response);
                if(!isDevServer){
                    logEvent(analytics,'type_of_traveler',{value:form.typeOfTraveler});
                    logEvent(analytics,'traveler_type_of_help',{value:form.typeOfHelpNeeded});
                    logEvent(analytics,'traveler_min_days',{value:form.minNumDays});
                    logEvent(analytics,'traveler_travel_as',{value:form.typeOfTraveler});
                    logEvent(analytics,'traveler_fee',{value:form.subscriptionFee});
                    toast.success("Thank you for the help",{position:toast.POSITION.TOP_RIGHT});
                }
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const subscribeAsHost = (form:HostHomeForm,setIsLoading:any):Promise<HostHomeForm>=>{
    return new Promise<HostHomeForm>((resolve,reject)=>
        post('home/host/form',form)
            .then((response:HostHomeForm)=>{
                resolve(response);
                if(!isDevServer){
                    logEvent(analytics,'type_of_host',{value:form.opportunityCategory});
                    logEvent(analytics,'host_type_of_help',{value:form.typeOfHelpNeeded});
                    logEvent(analytics,'host_min_days',{value:form.minNumDays});
                    logEvent(analytics,'host_preferable_season',{value:form.season});
                    logEvent(analytics,'host_fee',{value:form.monthlySubscription});
                    toast.success("Thank you for the help",{position:toast.POSITION.TOP_RIGHT});
                }
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};