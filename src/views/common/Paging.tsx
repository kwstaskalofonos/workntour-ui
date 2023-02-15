import React, {useEffect, useState} from "react";
import {Pagination} from "@src/utilities/fetch";

interface Props{
    pagination:Pagination,
    dataPerPage:number,
    page:number,
    setPage:any
}

const Paging:React.FunctionComponent<Props> = ({page,setPage,pagination,dataPerPage}) =>{

    const renderButtons = () =>{
        let array:any[]=[];
        let totalButtons =
          pagination.total % dataPerPage > 0
            ? Math.floor(pagination.total / dataPerPage) + 1
            : Math.floor(pagination.total / dataPerPage);
        if(totalButtons){
            for(let i=0; i<totalButtons; i++){
                array.push(<li key={"pagination-link-"+totalButtons+"-"+i+1}>
                    <a className={"pagination-link "+((i==page)?"is-current":"")} aria-label={"Page "+i}
                        aria-current="page" onClick={()=>setPage(i)}>{i+1}</a>
                </li>)
            }
        }
        return array;
    }

    return(
        <nav className="pagination is-small is-centered mt-2" role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                {renderButtons()}
            </ul>
        </nav>
    )
};

export default Paging;