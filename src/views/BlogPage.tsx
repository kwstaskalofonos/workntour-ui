import React from "react";
import InterCom from "@src/views/common/InterCom";
import Header from "@src/views/common/Header";

const BlogPage:React.FunctionComponent = () =>{

    return(
        <React.Fragment>
            <InterCom/>
            <Header/>
            <section className={"section is-large blog-page-banner"}>

            </section>
        </React.Fragment>
    )
};

export default BlogPage;