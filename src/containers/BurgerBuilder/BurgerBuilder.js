import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.5,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredient : {
            salad : 1,
            bacon : 1,
            cheese: 1,
            meat: 1

        },
        totalPrice: 4
    };

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount =  oldCount + 1;
        const updatesIngredients = {
            ...this.state.ingredient
        };
        updatesIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredient: updatesIngredients})

    };

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount =  oldCount - 1;
        const updatesIngredients = {
            ...this.state.ingredient
        };
        updatesIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredient: updatesIngredients})
    };
    render() {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredient}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemove={this.removeIngredientHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;