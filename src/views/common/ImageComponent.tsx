import React from "react";

interface Props{
    image:File,
    images:File[],
    setImages:any
}

const ImageComponent:React.FunctionComponent<Props> = ({image,images,setImages}) =>{

    const removeImage = () =>{
        let tmp = [...images];
        let idx = tmp.findIndex(value => value == image);
        if(idx>-1){
            tmp.splice(idx,1);
            setImages(tmp);
        }
    }

    return(
        <React.Fragment>
            <figure className={"image is-square"}>
                <img key={image.name} src={URL.createObjectURL(image)}/>
                <a className="tag is-delete"
                   onClick={removeImage}
                   style={{position:'absolute',top:'5px',right:'5px'}}></a>
            </figure>
        </React.Fragment>
    )
};

export default ImageComponent;