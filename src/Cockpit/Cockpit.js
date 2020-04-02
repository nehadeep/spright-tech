import React from "react";
import classes from './Cockpit.module.css'

const cockpit = props => {
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.blue
    } else{
        btnClass = classes.red;
    }
    return  (
        <div>
        <header className="App-header">
            <h1> Welcome to my First React app.</h1>
        </header>
        <button className={btnClass} onClick={props.clicked}>toggle </button>
        </div>
    )
}

export default cockpit