
import React from "react";
import classes from './Order.module.css'
const order = (props)=> {
    let ingredients = [];
    for(let IN in props.ingredients){
        ingredients.push({name: IN, amount: props.ingredients[IN]})
    };
    let ingreOutput = ingredients.map(ig=>{
        return <span style={{textTransform:'capitalize', display:'inline-block', margin: '0 8px', padding: '5px'}} key={ig.name}> {ig.name} {ig.amount}</span>;
    });
    return(
    <div className={classes.Order}>

        <p>Ingredient: {ingreOutput}</p>
        <p>Price:<strong>UDS: {props.price.toFixed(2)}</strong></p>
    </div>
    )
}

export default order;