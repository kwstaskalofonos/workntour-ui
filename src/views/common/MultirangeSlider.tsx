import React, {useState} from "react";

interface Props{
    max:number,
    min:number,
    onChange:any
}

const MultirangeSlider:React.FunctionComponent<Props> = ({min,max,onChange}) =>{

    const [minVal,setMinVal] = useState<number>(0);
    const [maxVal,setMaxVal] = useState<number>(100);

    return(
        <div className="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                }}
                className="thumb thumb--left"
                // style={{ zIndex: (minVal > max - 100) && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {}}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track" />
                <div className="slider__range" />
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>
        </div>
    )
};

export default MultirangeSlider;