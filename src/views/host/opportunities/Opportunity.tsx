import React from "react";

interface Props{
    img:any,
}

const Opportunity:React.FunctionComponent<Props> = ({img}) =>{

    return(
        <div className="card">
            <header className="card-header has-background-grey-lighter">

            </header>
            <div className="card-image">
                <figure className="image is-2by1">
                    <img src={img} alt="Placeholder image"/>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-5">Crete, Greece</p>
                        <p className="subtitle is-5">Hotel</p>
                        {/*<p className="subtitle is-6">28 May -27 Jun</p>*/}
                    </div>
                </div>

                <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="@src/views/host/opportunities/Opportunity#">#css</a> <a href="@src/views/host/opportunities/Opportunity#">#responsive</a>
                    <br/>
                        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>

            </div>
            <div className="card">
                <footer className="card-footer">
                    <a href="#" className="card-footer-item">Edit</a>
                    <a className="card-footer-item has-text-danger">Delete</a>
                </footer>
            </div>
        </div>
    )
};

export default Opportunity;