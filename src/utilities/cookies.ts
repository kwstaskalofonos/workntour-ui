import Cookies from "cookies-js";

const AUTH_TOKEN='workntour';
// @ts-ignore
const _cookie_domain = __COOKIE_DOMAIN__;

export function getCookie(key:string=AUTH_TOKEN):string{
    return Cookies.get(key);
}

export function hasCookie(key:string = AUTH_TOKEN){
    return Cookies.get(key) != null;
}

export function setCookie(value:string,days:number | 15, key:string = AUTH_TOKEN){
    if(Cookies.enabled){
        //Cookies.set(key,value,{expires:days*24*60*60,path:_cookie_domain});
        Cookies.set(key,value,{expires:days*24*60*60,domain:_cookie_domain,secure:false});
    }
}

export function deleteCookie(){
    //Cookies.expire(AUTH_TOKEN,{path:_cookie_domain});
    Cookies.expire(AUTH_TOKEN,{domain:_cookie_domain});
}

export function deleteSpecificCookie(key:string){
    //Cookies.expire(key,{path:_cookie_domain});
    Cookies.expire(key,{domain:_cookie_domain});
}

