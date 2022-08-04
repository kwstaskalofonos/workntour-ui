import React, {useState} from "react";
import ReactDatePicker from "react-datepicker";
import {OpportunityDates} from "@src/state/stores/opportunity/models";

interface Props{
    setDateRange:any
}

const CustomDateRangeInput:React.FunctionComponent<Props> = ({setDateRange}) =>{

    const [startDate,setStartDate] = useState<Date>(new Date);
    const [endDate,setEndDate] = useState<Date>();

    const formatDate = (date:string) =>{
        let idx = date.indexOf('T');
        return date.substring(0,idx);
    }

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

        />
    )
};

export default CustomDateRangeInput;