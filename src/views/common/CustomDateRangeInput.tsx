import React, {useEffect, useState} from "react";
import ReactDatePicker from "react-datepicker";
import {OpportunityDates} from "@src/state/stores/opportunity/models";
import Moment from "react-moment";
import moment from "moment/moment";

interface Props{
    setDateRange:any,
    resetEndData:boolean,
    isActive?:boolean
}

const CustomDateRangeInput:React.FunctionComponent<Props> = ({setDateRange,resetEndData,isActive}) =>{

    const [startDate,setStartDate] = useState<Date|undefined>(new Date);
    const [endDate,setEndDate] = useState<Date|undefined>();

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
        let dateRange:OpportunityDates;
        if(start!=startDate){
            //reset end Date.
            setStartDate(start);
            setEndDate(undefined);
            dateRange = {startDate:start,endDate:undefined};
        }else{
            setStartDate(start);
            setEndDate(end);
            dateRange = {startDate:start,endDate:end};
        }

        setDateRange(dateRange);

        let tmp:OpportunityDates={startDate:start&&formatDate(start.toISOString()),
        endDate:end&&formatDate(end.toISOString())}

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