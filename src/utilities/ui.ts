import {getCookie, hasCookie} from "@src/utilities/cookies";
import {CompanyHostProfile, IndividualHostProfile, Profile, Role, TravelerProfile} from "@src/state/stores/user/models";
import {formatISO} from "date-fns";

export function constructDate(day:string,month:string,year:string){

     const date = new Date(Number(year),Number(month)-1,Number(day)+1,0,0,0);
     let dateToSend = date.toISOString();
     let idx = dateToSend.indexOf('T');
     return dateToSend.substring(0,idx);
 }

export const formatDateISO = (date: Date) => {
    return formatISO(date, {representation: 'date'}) + 'T00:00:00';
};

export function extractYearMonthDay(date:string){
    let tmp:string[] = date.split("-");
    return [tmp[0],tmp[1],tmp[2]];
}

 export function isEmail(email:string){
     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
 }

 export function validPassword(pwd:string){
     const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
     return re.test(pwd);
 }

 export function isTraveler(){
    return (hasCookie()&&getCookie("role") === Role.TRAVELER.valueOf());
 }

export function isHost(){
    return (hasCookie()&&(getCookie("role") === Role.COMPANY_HOST.valueOf()||
        getCookie("role") === Role.INDIVIDUAL_HOST.valueOf()));
}

export function getUserDisplayName(){
    let name='';
    if(hasCookie()&&hasCookie('role')){
        switch (getCookie('role')){
            case Role.COMPANY_HOST.valueOf():{
                let profile:CompanyHostProfile = JSON.parse(getCookie('profile'));
                name = profile.companyName;
                break;
            }
            case Role.INDIVIDUAL_HOST.valueOf():{
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

//return Date like Aug 01, 2022
export function getDateFromString(date:string|undefined){
    if(date){
        let splitDate = new Date(date).toDateString().trim().split(/\s+/);
        let formattedDate = splitDate[1]+" "+splitDate[2]+", "+splitDate[3];
        return formattedDate;
    }
    return "";
}

export function getNationalities(){
    let tmp:any[]=[];
    tmp.push({value:"Greek",label:"Greek"});
    tmp.push({value:"British",label:"British"});
    tmp.push({value:"Italian",label:"Italian"});
    tmp.push({value:"German",label:"German"});
    tmp.push({value:"American",label:"American"});
    tmp.push({value:"Bulgarian",label:"Bulgarian"});
    tmp.push({value:"Turkish",label:"Turkish"});
    tmp.push({value:"Spanish",label:"Spanish"});
    return tmp;
}