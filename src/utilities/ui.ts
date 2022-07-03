import {getCookie, hasCookie} from "@src/utilities/cookies";
import {CompanyHostProfile, IndividualHostProfile, Profile, Role, TravelerProfile} from "@src/state/stores/user/models";

export function constructDate(day:string,month:string,year:string){

     const date = new Date(Number(year),Number(month)-1,Number(day),0,0,0);
     let dateToSend = date.toISOString();
     let idx = dateToSend.indexOf('T');
     return dateToSend.substring(0,idx);
 }


 export function isEmail(email:string){
     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
 }

 export function isTraveler(){
    return (hasCookie()&&getCookie("role") === Role.TRAVELER.valueOf());
 }

export function isHost(){
    return (hasCookie()&&(getCookie("role") === Role.COMPANY.valueOf()||
        getCookie("role") === Role.INDIVIDUAL.valueOf()));
}

export function getUserDisplayName(){
    let name='';
    if(hasCookie()&&hasCookie('role')){
        switch (getCookie('role')){
            case Role.COMPANY.valueOf():{
                let profile:CompanyHostProfile = JSON.parse(getCookie('profile'));
                name = profile.companyName;
                break;
            }
            case Role.INDIVIDUAL.valueOf():{
                let profile:IndividualHostProfile = JSON.parse(getCookie('profile'));
                name = profile.name
                break;
            }
            case Role.TRAVELER.valueOf():{
                let profile:TravelerProfile = JSON.parse(getCookie('profile'));
                name = profile.name
                break;
            }
        }
    }
    return name;
}