import React from "react";

interface Props{
    src:any,
    date:string,
    title:string
}

const ArticleComponent:React.FunctionComponent<Props> = ({src,date,title}) =>{

    return (
      <div className="is-flex is-flex-direction-column">
        <img
          style={{
            position: "relative",
            maxWidth: "400px",
            width: "100%",
            height: "300px",
            borderRadius: "5px",
          }}
          src={src}
        />
        <p className={"is-size-7 has-text-primary has-text-weight-semibold"}>
          {date}
        </p>
        <p
          className={"is-size-5 has-text-weight-semibold"}
          style={{ maxWidth: "400px", width: "100%" }}
        >
          {title}
        </p>
      </div>
    );
};

export default ArticleComponent;