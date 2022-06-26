import {post} from "@src/utilities/fetch";
import {toast} from "react-toastify";

// export const subscribe = (email:string,setIsLoading:any):Promise<void>=>{
//     return new Promise<void>((resolve,reject)=>
//         post('/earlySubscription',email)
//             .then((response:any)=>{
//                 toast.success("Successfully subscribed",{position:toast.POSITION.TOP_RIGHT});
//                 resolve(response);
//             }).catch((error)=>{
//             reject(error);
//             toast.error(error,{position:toast.POSITION.TOP_RIGHT});
//         }).finally(()=>setIsLoading(false))
//     )
// };