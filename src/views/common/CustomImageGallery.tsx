import React, {useEffect} from "react";

interface Props{
    imagesUrls:string[]|undefined
}

const CustomImageGallery:React.FunctionComponent<Props> = ({imagesUrls}) =>{

    useEffect(()=>{

    },[])

    return(
        <div className={"columns"}>
            <div className={"column is-1"}></div>
            <div className={"column"}>
                <div className={"columns is-multiline"}>
                    {imagesUrls &&
                        imagesUrls.map((value, index)=>
                            <img key={"image-"+index+1} src={value}
                                 style={{borderTopLeftRadius:'3px',borderTopRightRadius:'3px',
                                     borderBottomLeftRadius:'3px',borderBottomRightRadius:'3px'}}/>)
                    }
                </div>
            </div>
            <div className={"column is-1"}></div>
        </div>
    )
};

export default CustomImageGallery;