import {FilterCoordinates, FiltersFields, Opportunity, PagingObjects, Article} from "@src/state/stores/opportunity/models";
import {del, GenericResponse, get, paging, post, postMultipart} from "@src/utilities/fetch";
import {toast} from "react-toastify";


export const createOpportunity = (form:Opportunity,setIsLoading:any):Promise<Opportunity>=>{
    return new Promise<Opportunity>((resolve,reject)=>
        post('createNewOpportunity',form)
            .then((response:Opportunity)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const createOpportunityWeb = (data:FormData,setIsLoading:any):Promise<Opportunity>=>{
    return new Promise<Opportunity>((resolve,reject)=>
        postMultipart('createNewOpportunityWeb',data)
            .then((response:Opportunity)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const deleteOpportunity = (id:string):Promise<Opportunity>=>{
    return new Promise<Opportunity>((resolve,reject)=>
        del('deleteOpportunityBy/'+id)
            .then((response:Opportunity)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};

// export const createOpportunity = (form:Opportunity,setIsLoading:any,files:File[]):Promise<Opportunity>=>{
//     return new Promise<Opportunity>((resolve,reject)=>
//         postMultipart('createNewOpportunityWeb',form,files)
//             .then((response:Opportunity)=>{
//                 resolve(response);
//             }).catch((error)=>{
//             toast.error(error,{position:toast.POSITION.TOP_RIGHT});
//             reject(error);
//         }).finally(()=>setIsLoading(false))
//     )
// };

export const getOpportunities = (setIsLoading:any):Promise<Opportunity[]>=>{
    return new Promise<Opportunity[]>((resolve, reject)=>
        get('retrieveAllOpportunityByMemberId')
            .then((response:Opportunity[])=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};

export const getOpportunity = (opportunityId:string):Promise<Opportunity>=>{
    return new Promise<Opportunity>((resolve, reject)=>
        get('retrieveOpportunityBy/'+opportunityId)
            .then((response:Opportunity)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};

export const getOpportunitiesByPaging = (filtersFields:FiltersFields|undefined, start:number, offset:number):Promise<PagingObjects>=>{
    return new Promise<PagingObjects>((resolve, reject)=>
        paging('homePage/filters/?start='+start+"&offset="+offset,filtersFields)
            .then((response:PagingObjects)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};


export const getTotalOpportunities = (filtersFields:FiltersFields|undefined):Promise<number>=>{
    return new Promise<number>((resolve, reject)=>
        post('homePage/filters/numOfResults/',filtersFields)
            .then((response:number)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};

export const getTotalOpportunitiesByLocation = (longitude:number|undefined,latitude:number|undefined):Promise<FilterCoordinates[]>=>{
    return new Promise<FilterCoordinates[]>((resolve, reject)=>
        get('homePage/filters/byCoordinates/?longitude='+longitude+"&latitude="+latitude)
            .then((response:FilterCoordinates[])=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};

export const createArticle = (data:FormData,setIsLoading:any):Promise<Article>=>{
    return new Promise<Article>((resolve,reject)=>
        postMultipart('blog/create',data)
            .then((response:Article)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally(()=>setIsLoading(false))
    )
};


export const getArticle = (articleId:string):Promise<Article>=>{
    return new Promise<Article>((resolve, reject)=>
        get('blog/retrieve/' + articleId)
            .then((response:Article)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};

export const getArticlesByPaging = (filtersFields:FiltersFields|undefined, start:number, offset:number):Promise<PagingObjects>=>{
    return new Promise<PagingObjects>((resolve, reject)=>
        paging('homePage/filters/?start='+start+"&offset="+offset,filtersFields)
            .then((response:PagingObjects)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};

export const getTotalArticles = (filtersFields:FiltersFields|undefined):Promise<number>=>{
    return new Promise<number>((resolve, reject)=>
        post('homePage/filters/numOfResults/',filtersFields)
            .then((response:number)=>{
                resolve(response);
            }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            reject(error);
        }).finally()
    )
};
