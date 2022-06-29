import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useForm} from "react-hook-form";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LoginForm, Role} from "@src/state/stores/user/models";
import {GenericResponse, login} from "@src/utilities/fetch";
import {toast} from "react-toastify";
import {setCookie} from "@src/utilities/cookies";
import {
    retrieveCompanyProfile,
    retrieveIndividualProfile,
    retrieveTravelerProfile
} from "@src/state/stores/user/operations";

export interface Props{
    ref:any
}

export interface LoginModalHandler{
    open:()=>void,
    close:()=>void
}

const LoginModal:React.FunctionComponent<Props>=
    forwardRef<LoginModalHandler>(( props,ref:React.Ref<LoginModalHandler>)=>{

    const [isActive,setIsActive] = useState<boolean>(false);
    const form = useForm();
    const {register,handleSubmit,getValues} = form;
    const [isLoading,setIsLoading] = useState<boolean>(false);

   useImperativeHandle(ref,()=>{
       return{
           open:()=>{
               setIsActive(true);
           },
           close:()=>{
               setIsActive(false);
           }
       }
   })

    const onSubmit:any=(data:LoginForm)=>{
       setIsLoading(true);
       login(data.email,data.password)
           .then((response:GenericResponse)=>{
               // @ts-ignore
               setCookie(response.data.memberId);
               // @ts-ignore
               setCookie(response.data.role,15,"role");
               // @ts-ignore
               switch (response.data.role){
                   case Role.TRAVELER.valueOf():{
                       // @ts-ignore
                       retrieveTravelerProfile(response.data.memberId);
                       break;
                   }
                   case Role.COMPANY.valueOf():{
                       // @ts-ignore
                       retrieveCompanyProfile(response.data.memberId);
                       break;
                   }
                   case Role.INDIVIDUAL.valueOf():{
                       // @ts-ignore
                       retrieveIndividualProfile(response.data.memberId);
                       break;
                   }
               }
               setIsLoading(false);
               window.location.replace("/");
           })
           .catch((error)=>{
               toast.error(error,{position:toast.POSITION.TOP_RIGHT});
           }).finally(()=> setIsLoading(false))
    }

    const openRegisterModal = () =>{
    }

    return(
        <div className={"modal "+(isActive?"is-active":'')}>
            <div className="modal-background"></div>
            <div className={"modal-card"}>
                <header className={"modal-card-head"}>
                    <p className="modal-card-title">Login</p>
                    <button className="delete" aria-label="close" onClick={()=>setIsActive(false)}></button>
                </header>
                <section className={"modal-card-body"}>
                    <p className="title is-4 has-text-weight-bold has-text-primary has-text-centered">Login into your account</p>
                    <div className={"columns is-centered"}>
                        <div className={"column is-8"}>
                            <form>
                                <div className={"field"}>
                                    <label className="label has-text-primary has-text-weight-medium is-normal">Email</label>
                                    <div className="control">
                                        <input className="input border-linear is-normal" type="text"
                                               {...register("email",{required:true})}
                                               placeholder="Enter your email"/>
                                    </div>
                                </div>
                                <div className={"field"}>
                                    <label className="label has-text-primary has-text-weight-medium is-normal">Password</label>
                                    <p className="control has-icons-right">
                                        <input className="input border-linear is-normal" type="password"
                                               {...register("password",{required:true})}
                                               placeholder="Enter your password"/>
                                        <span className={"icon is-small is-right"}>
                                            <FontAwesomeIcon icon={faEyeSlash}/>
                                        </span>
                                    </p>
                                </div>
                                <div className="field is-flex is-justify-content-space-between">
                                    <div className="control">
                                        <label className="checkbox label is-small has-text-grey-light">
                                            <input type="checkbox"/>
                                            &nbsp;Remember Me
                                        </label>
                                    </div>
                                    <div className="control">
                                        <label className="label is-small">
                                            <a className={"has-text-primary is-underlined"}>Forgot Password</a>
                                        </label>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className={"button is-primary is-fullwidth "+(isLoading?"is-loading":"")}
                                            type={"button"} onClick={handleSubmit(onSubmit)}>
                                        Login</button>
                                </div>
                                <div className={"field has-text-centered mt-5"}>
                                    <label className={"label has-text-weight-normal"}>New Member?
                                        <a className={"has-text-info"} onClick={()=>openRegisterModal()}>
                                            Register here</a></label>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={()=>setIsActive(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    )

});

export default LoginModal;