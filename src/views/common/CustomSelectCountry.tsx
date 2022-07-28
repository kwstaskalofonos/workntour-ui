import React from "react";
import {countries} from "@src/utilities/countries";
import Flag from "react-flagkit";
import Select from "react-select";

export interface Props{
    value:{value:string,label:JSX.Element},
    setValue:any,
    setCountryCode:any
}

const CustomSelectCountry:React.FunctionComponent<Props> = ({value,setValue,setCountryCode}) =>{

    const options = ()=>{
        let selectOptions:any[]=[];
        for(var country of countries){
            selectOptions.push({value:country.value,code:country.code,label:<Flag country={country.value} />})
        }
        return selectOptions;
    }

    const onChange = (selectValue:any) =>{
        setCountryCode(selectValue.code);
        setValue({value:selectValue.value,label:<Flag country={selectValue.value} />})
    }

    return(
        <Select className={"border-linear-no-right"}
            options={options()}
            value={value}
            onChange={(value)=>onChange(value)}/>
    )
};

export default CustomSelectCountry;