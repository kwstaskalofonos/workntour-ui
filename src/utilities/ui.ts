 export function constructDate(day:string,month:string,year:string){

     const date = new Date(Number(year),Number(month)-1,Number(day),0,0,0);
     let dateToSend = date.toISOString();
     let idx = dateToSend.indexOf('T');
     return dateToSend.substring(0,idx);
 }