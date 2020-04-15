import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from './Burger.module.css'

const  burger = (props) => {
    let transformedIngre = Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
               return <BurgerIngredients key={igKey +i} type={igKey}/>;
            })
        }).reduce((arr, el)=>{
            return arr.concat(el)
        }, []);

    if(transformedIngre.length===0){

        transformedIngre = <p>Please start adding ingredient</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transformedIngre}
            <BurgerIngredients type='bread-bottom'/>

        </div>
    );
}

export default burger;