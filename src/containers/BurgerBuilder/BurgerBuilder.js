import React, {Component} from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosIns from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.5,
    bacon: 0.7
};

class BurgerBuilder extends Component{

    state = {
        ingredient :null,
        totalPrice: 4,
        purchasable : false,
        purchasing : false,
        loading: false,
        error: false
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

    componentDidMount(): void {
        axiosIns.get('https://react-burger-35f1f.firebaseio.com/ingredients.json').then(response=>{
            this.setState({ingredient: response.data})
        }).catch(error => {
            this.setState({error: true})
        });
    }

    purchaseHandler =()=> {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});

    };
    purchaseContinueHandler = ()=>{
      //  alert("You Continued.")

        this.setState({loading: true});

        const order=  {
            ingredient : this.state.ingredient,
            price: this.state.totalPrice,
            customer: {
                name: 'Hardeep',
                address : {
                    street : '123 st',
                    zipCode: '12345',
                    country: 'USA',
                },
                email: 'kaur@test.com'

            },
            deliveryMethod: 'fastest'
        };

        axiosIns.post('/orders.json', order).then(response=>{

            this.setState({loading: false, purchasing: false});

        }).catch(error=> {

            this.setState({loading: false, purchasing: false});

        })

    };
    render() {
        const disabledInfo = {
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.state.error?<p>Ingredients can't loaded</p>: null;

        if(this.state.ingredient) {
            burger = (
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.state.ingredient}/>
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                                   ingredientRemove={this.removeIngredientHandler}
                                   disabled={disabledInfo} price={this.state.totalPrice}
                                   purchasable={this.state.purchasable}
                                   ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredient} purchasedCancelled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler} price={this.state.totalPrice}/>;
        };
        if(this.state.loading){
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axiosIns);