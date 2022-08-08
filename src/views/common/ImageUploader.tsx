import React, {useMemo, useState} from "react";
import Dropzone, {useDropzone} from 'react-dropzone';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons/faCloudUpload";
import ImageComponent from "@src/views/common/ImageComponent";

interface Props{
    images:File[],
    setImages:any
}

const ImageUploader:React.FunctionComponent<Props> = ({images,setImages}) =>{


    const baseStyle = {
        flex: 1,
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const onDrop = (acceptedFiles:File[]) =>{
        let tmp = [...images];
        acceptedFiles.forEach(value => {
            if(tmp.findIndex(image => image==value)<0){
                tmp.push(value);
            }
        })
        setImages(tmp);
    }

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone(
        {accept: {'image/jpeg': [],
                            'image/png':[],
                            'image/gif':[],
                            'image/jpg':[]},onDrop});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const renderFiles = () =>{
        let array:any[]=[];
        images.forEach(value => {
            array.push(<div className={"column is-one-third"}>
                <ImageComponent image={value} images={images} setImages={setImages}/>
            </div>)
        })
        return array;
    }


    return(
    <React.Fragment>
        <div className="file is-large is-boxed is-fullwidth mb-3">
            <Dropzone
                onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section style={baseStyle}>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}
                                   style={{
                                       width:'100%',
                                       height:'100%',
                                       display:'none'}}/>
                            <span className="file-label has-text-primary has-text-centered is-size-5 has-text-weight-semibold">
                                        Click to upload your images <FontAwesomeIcon className={"has-text-primary"} icon={faCloudUpload}/></span>
                            <p className="file-label has-text-primary has-text-centered is-size-6 has-text-weight-light">
                                SVG,PNG,JPG or GIF (max. 800x400px)
                            </p>
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
        <div className={"columns is-multiline mb-3"}>
            {renderFiles()}
        </div>
    </React.Fragment>

    )
};

export default ImageUploader;