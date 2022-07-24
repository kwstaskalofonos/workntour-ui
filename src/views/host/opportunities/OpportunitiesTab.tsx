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
import {deleteOpportunity, getOpportunities} from "@src/state/stores/opportunity/operations";
import LoadingOpportunity from "@src/views/common/LoadingOpportunity";
import GenericModal from "@src/views/common/GenericModal";
import cloneDeep from "lodash/cloneDeep";

const OpportunitiesTab:React.FunctionComponent = () =>{

    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [batch,setBatch] = useState<Opportunity[]>([]);
    const [opportunityToDelete,setOpportunityToDelete] = useState<Opportunity>();
    const [isActiveDelModal,setIsActiveDelModal] = useState<boolean>(false);

    useEffect(()=>{
        getOpportunities(setIsLoading)
            .then((response)=>{
                //@ts-ignore
                setBatch(response);
            })
    },[])

    const renderOpportunities = () =>{
        let array:any[]=[];
        for(const opp of batch){
            array.push(<div className={"column is-4"}>
                <OpportunityCard key={"opportunity-row"+1} img={op1} opportunity={opp} setOpportunityToDelete={setOpportunityToDelete}/></div> )
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

    useEffect(()=>{
        if(opportunityToDelete){
            setIsActiveDelModal(true);
        }
    },[opportunityToDelete])

    const delOpportunity = () =>{
        if(opportunityToDelete){
            deleteOpportunity(opportunityToDelete?.opportunityId)
                .then((response)=>{
                    let tmp = cloneDeep(batch);
                    let idx = tmp.findIndex(value=>value.opportunityId==response.opportunityId);
                    if(idx>-1){
                        tmp.splice(idx,1);
                        setBatch(tmp);
                    }
                });
        }
        setIsActiveDelModal(false);
        setOpportunityToDelete(undefined);
    }

    const onCloseModal = () =>{
        setIsActiveDelModal(false);
        setOpportunityToDelete(undefined);
    }

    return(
        <div className="columns is-multiline">
            {isLoading ?
                loadingOpportunities()
                :batch&&batch.map(value => <div className={"column is-4"}>
                    <OpportunityCard key={"opportunity-row"+1} img={op1} opportunity={value} setOpportunityToDelete={setOpportunityToDelete}/></div>)
            }
            {isActiveDelModal &&
                <GenericModal title={"Delete Opportunity"} action={delOpportunity} close={onCloseModal}
                              bodyMessage={"Are you sure you want to delete this opportunity?"}/>
            }
        </div>
    )
};
export default OpportunitiesTab;