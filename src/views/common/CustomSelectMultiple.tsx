import React, {useEffect, useState} from "react";
import {TypeOfHelpNeeded, TypeOfHelpNeededType} from "@src/state/stores/opportunity/models";

interface Props{
    field:string,
    options:any[],
    register:any,
    placeholder:string,
    selectedValues:any[],
    setSelectedValues:any,
    enumType:any,
}

const CustomSelectMultiple:React.FunctionComponent<Props> = ({field,options,register,placeholder,
                                                             selectedValues,setSelectedValues,enumType}) =>{

    const [value,setValue] = useState<any>();


    const onSelect = (selectedValue:string) =>{
        let tmp = [...selectedValues];
        if(tmp.findIndex(value => value==selectedValue)<0){
            tmp.push(selectedValue);
            setSelectedValues(tmp);
        }
    }

    const removeFromSelected = (selectedValue:string) =>{
        if(selectedValue){
            let tmp = [...selectedValues];
            let idx = tmp.findIndex(value => value == selectedValue);
            if(idx>-1){
                tmp.splice(idx,1);
                setSelectedValues(tmp);
            }
        }
    }

    const renderSelected = () =>{
        let array:any[]=[];
        for(const selected of selectedValues){
            array.push(<React.Fragment key={"selected-prop-"+selected}>
                <span className="tag is-primary m-1">
                    {enumType[selected]}</span>
                <a className="tag is-delete" onClick={()=>removeFromSelected(selected)}></a>
            </React.Fragment>)
        }
        return array;
    }

    return(
        <div className="control">
            <div className="select is-fullwidth">
                <select
                    {...register(field)}
                    className={"border-linear has-text-primary"}
                    placeholder={placeholder}
                    value={value?value:''}
                    onChange={(event)=>onSelect(event.target.value)}>
                    {options}
                </select>
            </div>
            {selectedValues.length>0 &&
                <div className="field is-grouped is-grouped-multiline border-linear mt-3 mb-3" style={{borderRadius:"8px"}}>
                    {renderSelected()}
                </div>
            }
        </div>
    )
};

export default CustomSelectMultiple;