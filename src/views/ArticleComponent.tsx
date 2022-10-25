import React from "react";

interface Props{
    src:any,
    date:string,
    title:string
}

const ArticleComponent:React.FunctionComponent<Props> = ({src,date,title}) =>{

    return(
        <div style={{position:'relative'}}>
            <img src={src} width={270} height={270}/>
            <p className={"is-size-7 has-text-primary has-text-weight-semibold"}>{date}</p>
            <p className={"is-size-5 has-text-weight-semibold"}>{title}</p>
        </div>
    )
};

export default ArticleComponent;