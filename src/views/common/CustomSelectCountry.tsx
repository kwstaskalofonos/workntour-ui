import React from "react";
import {countries} from "@src/utilities/countries";
import Flag from "react-flagkit";
import Select from "react-select";

export interface Props{
    value:{value:string,label:JSX.Element},
    setValue:any
}

const CustomSelectCountry:React.FunctionComponent<Props> = ({value,setValue}) =>{

    const options = ()=>{
        let selectOptions:any[]=[];
        for(var country of countries){
            selectOptions.push({value:country.value,label:<Flag country={country.value} />})
        }
        return selectOptions;
    }

    const onChange = (selectValue:any) =>{
        setValue({value:selectValue.value,label:<Flag country={selectValue.value} />})
    }

    return(
        <Select
            options={options()}
            value={value}
            onChange={(value)=>onChange(value)}/>
    )
};

export default CustomSelectCountry;