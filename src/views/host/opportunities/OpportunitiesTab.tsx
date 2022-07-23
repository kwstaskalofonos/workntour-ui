import React, {useEffect, useState} from "react";
// @ts-ignore
import op1 from "@src/assets/opportunities/opportunity_1.jpg";
// @ts-ignore
import op2 from "@src/assets/opportunities/opportunity_2.jpg";
// @ts-ignore
import op3 from "@src/assets/opportunities/opportunity_3.jpg";
// @ts-ignore
import op4 from "@src/assets/opportunities/opportunity_4.jpg";
import OpportunityCard from "@src/views/host/opportunities/OpportunityCard";
import {Opportunity} from "@src/state/stores/opportunity/models";
import {getOpportunities} from "@src/state/stores/opportunity/operations";
import LoadingOpportunity from "@src/views/common/LoadingOpportunity";

const OpportunitiesTab:React.FunctionComponent = () =>{

    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [batch,setBatch] = useState<Opportunity[]>([]);

    useEffect(()=>{
        getOpportunities(setIsLoading)
            .then((response)=>{
                //@ts-ignore
                setBatch(response.data);
            })
    },[])

    const renderOpportunities = () =>{
        let array:any[]=[];
        for(const opp of batch){
            array.push(<div className={"column is-4"}>
                <OpportunityCard key={"opportunity-row"+1} img={op1} opportunity={opp}/></div> )
        }
        return array;
    }

    const loadingOpportunities = () =>{
        let array:any[]=[];

        for(let i=1; i<22; i++){
            array.push(<div key={"loading-row-"+i} className={"column is-4"}>
                <LoadingOpportunity/></div> )
        }

        return array;
    }

    return(
        <div className="columns is-multiline">
            {isLoading ?
                loadingOpportunities():renderOpportunities()
            }
        </div>
    )
};
export default OpportunitiesTab;