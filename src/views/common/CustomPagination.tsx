import React from "react";

interface Props{
    length:number,
    selectedPage:number,
    setSelectedPage:any
}

const CustomPagination:React.FunctionComponent<Props> = ({length,selectedPage,setSelectedPage}) =>{

    const goToPrev = () =>{
        if(selectedPage == 0){
            setSelectedPage(length-1);
        }else{
            setSelectedPage(selectedPage-1);
        }
    }

    const goToNext = () =>{
        if(selectedPage == length-1){
            setSelectedPage(0);
        }else{
            setSelectedPage(selectedPage+1);
        }
    }

    return(
        <nav className="pagination is-rounded is-small" role="navigation" aria-label="pagination"
             style={{position:'absolute',
             bottom:'3px',right:'31%'}}>
            <a className="pagination-previous has-background-primary-light has-text-white"
            onClick={goToPrev}>Previous</a>
            <a className="pagination-next has-background-primary-light has-text-white"
            onClick={goToNext}>Next Image</a>
        </nav>
    )
};

export default CustomPagination;