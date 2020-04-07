import React from "react";
import burgerLogo from '../../assets/Images/burgerLogo.png';
import classes from './Logo.module.css'
const logo = (props) =>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Burger"/>
    </div>
);
export default logo;