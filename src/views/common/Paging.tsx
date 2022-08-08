import React, {useEffect, useState} from "react";
import {Pagination} from "@src/utilities/fetch";

interface Props{
    pagination:Pagination,
    page:number,
    setPage:any
}

const Paging:React.FunctionComponent<Props> = ({page,setPage,pagination}) =>{

    const [totalButtons,setTotalButtons] = useState<number>();

    useEffect(()=>{
        calculateTotalButtons();
    },[pagination])

    const calculateTotalButtons = () =>{
        let div = pagination.total/10;
        setTotalButtons(Math.ceil(div));
    }

    const renderButtons = () =>{
        let array:any[]=[];
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