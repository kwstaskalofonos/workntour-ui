import React from "react";
// @ts-ignore
import op1 from "@src/assets/opportunities/opportunity_1.jpg";
// @ts-ignore
import op2 from "@src/assets/opportunities/opportunity_2.jpg";
// @ts-ignore
import op3 from "@src/assets/opportunities/opportunity_3.jpg";
// @ts-ignore
import op4 from "@src/assets/opportunities/opportunity_4.jpg";
import Opportunity from "@src/views/host/opportunities/Opportunity";

const OpportunitiesTab:React.FunctionComponent = () =>{

    const renderOpportunities = () =>{
        let array:any[]=[];

        array.push(<div className={"column is-4"}>
            <Opportunity key={"opportunity-row"+1} img={op1}/></div> )
        array.push(<div className={"column is-4"}>
            <Opportunity key={"opportunity-row"+2} img={op2}/></div> )
        array.push(<div className={"column is-4"}>
            <Opportunity key={"opportunity-row"+3} img={op3}/></div> )
        array.push(<div className={"column is-4"}>
            <Opportunity key={"opportunity-row"+4} img={op4}/></div> )
        array.push(<div className={"column is-4"}>
            <Opportunity key={"opportunity-row"+5} img={op1}/></div> )
        array.push(<div className={"column is-4"}>
            <Opportunity key={"opportunity-row"+6} img={op4}/></div> )
        return array;
    }

    return(
        <div className="columns is-multiline">
            {renderOpportunities()}
        </div>
    )
};
export default OpportunitiesTab;