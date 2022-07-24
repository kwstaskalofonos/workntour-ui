import React from "react";

interface Props{
    title:string,
    bodyMessage:string,
    action:any,
    close:any
}

const GenericModal:React.FunctionComponent<Props> = ({title,bodyMessage,action,close}) =>{

    return(
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" onClick={close}></button>
                </header>
                <section className="modal-card-body">
                    {bodyMessage}
                </section>
                <footer className="modal-card-foot is-justify-content-end">
                    <button className="button is-danger is-outlined" onClick={action}>Proceed</button>
                    <button className="button" onClick={close}>Cancel</button>
                </footer>
            </div>
        </div>
    )
};

export default GenericModal;