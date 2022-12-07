import React, {useEffect, useState} from "react";
import InterCom from "@src/views/common/InterCom";
import Header from "@src/views/common/Header";
import {toast} from "react-toastify";
import {GenericResponse, subscribe} from "@src/utilities/fetch";

// @ts-ignore
import blog1 from "@src/assets/blog/blog1.png";
// @ts-ignore
import blog2 from "@src/assets/blog/blog2.png";
// @ts-ignore
import blog3 from "@src/assets/blog/blog3.png";
import ArticleComponent from "@src/views/ArticleComponent";
import {logEvent} from "firebase/analytics";
import {analytics} from "@src/utilities/firebase";
import {isDevServer} from "../../webpack/env";
import Paging from "./common/Paging";
import { Pagination } from "@src/utilities/fetch";

const BlogPage:React.FunctionComponent = () =>{

    const [email,setEmail] = useState<string>("");
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [paging, setPaging] = useState<Pagination>();
    const [start, setStart] = useState<number>(0);


    useEffect(()=>{
        if(!isDevServer){
            logEvent(analytics, 'blog_page',{
                content_type:'string',event_label:"Blog Page",
            });
        }
    },[])

    const isEmail = () =>{
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const doSubscribe = () =>{
        if(!isEmail()){
            toast.error("Input is not valid email address.",{position:toast.POSITION.TOP_RIGHT});
            return;
        }
        setIsLoading(true);
        subscribe(email,setIsLoading).then((response:GenericResponse)=>{
            toast.success("Subscribed successfully",{position:toast.POSITION.TOP_RIGHT});
            setEmail("");
        }).catch((error)=>{
            toast.error(error,{position:toast.POSITION.TOP_RIGHT});
            setEmail("");
        });
    }

    return(
        <React.Fragment>
            <InterCom/>
            <section className={"section is-large blog-page-banner pt-6 pb-6"}>

                <div className={"hero-body is-flex is-justify-content-center"}>
                    <div>
                        <p className={"title is-size-1 has-text-white-bis has-text-centered"}>Workntour Blog</p>
                        <div className={"is-flex is-justify-content-center"}>
                            <p className={"subtitle has-text-white-bis has-text-centered"}>Subscribe to learn about new product features, the latest technology,<br/>
                                solutions, and updates</p>
                        </div>
                    </div>
                </div>
                <div className={"columns is-centered mb-6 mt-6"}>
                    <div className={"column is-7"}>
                        <div className="field is-grouped">
                            <p className="control is-expanded mr-1">
                                <input id={"langPageEmail"} className="input" type="text" placeholder="Please type your email here..."
                                onChange={(event)=>setEmail(event.currentTarget.value)}/>
                            </p>
                            <p className="control">
                                <a className="button is-primary" onClick={()=>doSubscribe()}>
                                    Subscribe
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={"section is-medium pt-6"}>
                <div className={"columns is-multiline is-centered"}>
                    <div className={"column is-one-quarter is-flex is-justify-content-center"}>
                        <ArticleComponent src={blog1} date={"19 Jan 2022"} title={"Workntour: Μια νέα τάση στον Τουρισμό"}/>
                    </div>
                    <div className={"column is-one-quarter is-flex is-justify-content-center"}>
                        <ArticleComponent src={blog2} date={"19 Jan 2022"} title={"Which are the smart apps that offer solutions and " +
                            "experiences to the traveler?"}/>
                    </div>
                    <div className={"column is-one-quarter is-flex is-justify-content-center"}>
                        <ArticleComponent src={blog3} date={"19 Jan 2022"} title={"The 5th Cycle of CapsuleT has just started!"}/>
                    </div>
                </div>
                {!isLoading && paging&&
                    <Paging pagination={paging} page={start} setPage={setStart}/>
                }
            </section>
        </React.Fragment>
    )
};

export default BlogPage;