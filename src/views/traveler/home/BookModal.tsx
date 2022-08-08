import React, {useEffect, useState} from "react";
import {Opportunity, OpportunityDates} from "@src/state/stores/opportunity/models";
import ReactDatePicker from "react-datepicker";
import {toast} from "react-toastify";

interface Props{
    active:boolean,
    setActive:any,
    opportunity:Opportunity
}

const BookModal:React.FunctionComponent<Props> = ({active,setActive,opportunity}) =>{

    const [opportunityDateRange,setOpportunityDateRange] = useState<OpportunityDates>();
    const [startDate,setStartDate] = useState<Date>();
    const [endDate,setEndDate] = useState<Date>();
    const [selectedStart,setSelectedStart] = useState<Date|null>(null);
    const [selectedEnd,setSelectedEnd] = useState<Date|null>(null);

    useEffect(()=>{
        if(opportunity){
            setStartDate(new Date(opportunity.opportunityDates[0].startDate));
            if(opportunity.opportunityDates[0].endDate){
                setEndDate(new Date(opportunity.opportunityDates[0].endDate));
            }
        }
    },[])

    const formatDate = (date:string) =>{
        let idx = date.indexOf('T');
        return date.substring(0,idx);
    }

    const onChange = (dates:any) =>{
        const[start,end] = dates;
        if(start!=selectedStart){
            //reset end Date.
            setSelectedStart(start);
            setSelectedEnd(null);
        }else{
            setSelectedStart(start);
            setSelectedEnd(end);
        }


        let tmp:OpportunityDates={startDate:start&&formatDate(start.toISOString()),
            endDate:end&&formatDate(end.toISOString())}

        setOpportunityDateRange(tmp);
    }

    const submit = () =>{
        if(!opportunityDateRange||!opportunityDateRange.startDate||!opportunityDateRange.startDate){
            toast.error("Not date range selected",{position:toast.POSITION.TOP_RIGHT});
            return;
        }
        setActive(false);
        toast.success("Booking completed",{position:toast.POSITION.TOP_RIGHT});
    }

    return(
        <div className={"modal "+(active?"is-active":'')}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className={"modal-card-head"}>
                    <p className="modal-card-title">Book</p>
                    <button className="delete" aria-label="close" onClick={()=>setActive(false)}></button>
                </header>
                <section className="modal-card-body">
                    <ReactDatePicker
                        dateFormat={"yyyy/MM/dd"}
                        selected={null}
                        startDate={selectedStart}
                        endDate={selectedEnd}
                        onChange={onChange}
                        selectsRange={true}
                        inline={true}
                        minDate={startDate}
                        maxDate={endDate}
                    />
                </section>
                <footer className="modal-card-foot is-justify-content-end">
                    <div className="buttons">
                            <button className="button" >Cancel</button>
                            <button className="button is-primary" onClick={()=>submit()}>Book</button>
                    </div>
                </footer>
            </div>
        </div>
    )
};

export default BookModal;