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
