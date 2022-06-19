import React, {ChangeEvent, useEffect, useState} from "react";

export interface Props{
    day:string,
    setDay:any,
    month:string,
    setMonth:any,
    year:string,
    setYear:any
}

const CustomDateInput:React.FunctionComponent<Props> = ({day,setDay,month,setMonth,
                                                        year,setYear}) =>{


    const onDayChange = (value:ChangeEvent<HTMLInputElement>) =>{
        if(!isNaN(Number(value.target.value))&&Number(value.target.value)>=0
            &&Number(value.target.value)<=31){
            setDay(value.target.value);
        }
    }

    const onMonthChange = (value:ChangeEvent<HTMLInputElement>) =>{
        if(!isNaN(Number(value.target.value))&&Number(value.target.value)>=0
            &&Number(value.target.value)<=12){
            setMonth(value.target.value);
        }
    }

    const onYearChange = (value:ChangeEvent<HTMLInputElement>) =>{
        if(!isNaN(Number(value.target.value))&&Number(value.target.value)>=0){
            setYear(value.target.value);
        }
    }

    return(
        <div className={"field mt-4"}>
            <label className="label has-text-primary has-text-weight-medium">What is your date of birthday?</label>
            <div className={"columns is-mobile"}>
                <div className={"column is-size-3-mobile"}>
                    <div className="control">
                        <label className="label is-size-7 has-text-primary has-text-weight-medium">Day</label>
                        <input className="input border-linear" type="text"
                            placeholder={"01"} onChange={onDayChange}
                            value={day}/>
                    </div>
                </div>

                <div className={"column is-size-3-mobile"}>
                    <div className="control">
                        <label className="label is-size-7 has-text-primary has-text-weight-medium">Month</label>
                        <input className="input border-linear" type="text"
                            placeholder={"01"} onChange={onMonthChange}
                        value={month}/>
                    </div>
                </div>

                <div className={"column is-5 is-size-6-mobile"}>
                    <div className="control">
                        <label className="label is-size-7 has-text-primary has-text-weight-medium">Year</label>
                        <input className="input border-linear" type="text"
                               placeholder={"1994"} onChange={(value)=>onYearChange(value)}
                        value={year}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CustomDateInput;