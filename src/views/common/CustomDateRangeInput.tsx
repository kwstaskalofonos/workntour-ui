import React, {useEffect, useState} from "react";
import ReactDatePicker from "react-datepicker";
import {OpportunityDates} from "@src/state/stores/opportunity/models";
import Moment from "react-moment";
import moment from "moment/moment";
import {constructDate, formatDateISO} from "@src/utilities/ui";

interface Props{
    setDateRange:any,
    resetEndData:boolean,
    isActive?:boolean,
    startDate?:Date,
    setStartDate:any,
    endDate?:Date,
    setEndDate:any
}

const CustomDateRangeInput:React.FunctionComponent<Props> = ({setDateRange,resetEndData,isActive
                                                                 ,startDate,setStartDate,endDate,setEndDate}) =>{


    const formatDate = (date:string) =>{
        let idx = date.indexOf('T');
        return date.substring(0,idx);
    }

    useEffect(()=>{
        if(resetEndData&&isActive){
            setStartDate(undefined);
            setEndDate(undefined);
        }
    },[isActive])

    const onChange = (dates:any) =>{
        const[start,end] = dates;
        if(start!=startDate){
            //reset end Date.
            setStartDate(start);
            setEndDate(undefined);
        }else{
            setStartDate(start);
            setEndDate(end);
        }

        let tmp:OpportunityDates={startDate:start&&formatDate(formatDateISO(new Date(start))),
        endDate:end&&formatDate(formatDateISO(new Date(end)))}
        setDateRange(tmp);
    }

    return(
        <ReactDatePicker
            dateFormat={"yyyy/MM/dd"}
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            selectsRange={true}
            inline={true}
            minDate={moment().toDate()}
        />
    )
};

export default CustomDateRangeInput;