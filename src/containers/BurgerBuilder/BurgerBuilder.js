import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.5,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredient : {
            salad : 0,
            bacon : 0,
            cheese: 1,
            meat: 1

        },
        totalPrice: 4,
        purchasable : false,
        purchasing : false
    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum + el;
        }, 0);

        this.setState({purchasable: sum> 0})
    }

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
        this.setState({totalPrice: newPrice, ingredient: updatesIngredients});
        this.updatePurchaseState(updatesIngredients);

    };

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredient[type];
        if(oldCount <= 0) {
          return;
        }
            const updatedCount = oldCount - 1;
            const updatesIngredients = {
                ...this.state.ingredient
            };
            updatesIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice, ingredient: updatesIngredients});
            this.updatePurchaseState(updatesIngredients)

    };

    purchaseHandler =()=> {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});

    };
    purchaseContinueHandler = ()=>{
        alert("You Continued.")
    };
    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        console.log("disables infp", disabledInfo);
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredient} purchasedCancelled={this.purchaseCancelHandler}
                                  purchaseContinue={this.purchaseContinueHandler} price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients = {this.state.ingredient}/>
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemove={this.removeIngredientHandler}
                               disabled={disabledInfo} price = {this.state.totalPrice}
                                purchasable = {this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;