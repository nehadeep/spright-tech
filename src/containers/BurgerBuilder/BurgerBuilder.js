import React, {Component} from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosIns from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux'
import * as burgerBuilderActions from "../../store/actions/index";
import * as actions from "../../store/actions/index";


class BurgerBuilder extends Component{

    state = {
        purchasing : false,
    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum + el;
        }, 0);

        return  sum> 0;
    }

    // addIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredient[type];
    //     const updatedCount =  oldCount + 1;
    //     const updatesIngredients = {
    //         ...this.state.ingredient
    //     };
    //     updatesIngredients[type] = updatedCount;
    //   //  const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredient: updatesIngredients});
    //     this.updatePurchaseState(updatesIngredients);
    //
    // };
    //
    // removeIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredient[type];
    //     if(oldCount <= 0) {
    //       return;
    //     }
    //         const updatedCount = oldCount - 1;
    //         const updatesIngredients = {
    //             ...this.state.ingredient
    //         };
    //         updatesIngredients[type] = updatedCount;
    //       //  const priceDeduction = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - priceDeduction;
    //         this.setState({totalPrice: newPrice, ingredient: updatesIngredients});
    //         this.updatePurchaseState(updatesIngredients)
    //
    // };

    componentDidMount() {
     this.props.onInitIngredients();
    }

    purchaseHandler =()=> {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing: false});

    };
    purchaseContinueHandler = ()=>{ //handled thru redux
      //  alert("You Continued.")

        // const queryParams = [];
        // for(let i in this.state.ingredient){
        //     queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredient[i]))
        // }
        // queryParams.push('price=' +this.state.totalPrice);
        // const queryString = queryParams.join('&')
        this.props.onInitPurchase();

        this.props.history.push('/checkout');



    };
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.props.error?<p>Ingredients can't loaded</p>: null;

        if(this.props.ings) {
            burger = (
                <Aux>
                    {/*<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>*/}
                    {/*    {orderSummary}*/}
                    {/*</Modal>*/}
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded}
                                   ingredientRemove={this.props.onIngredientRemove}
                                   disabled={disabledInfo} price={this.props.price}
                                   purchasable={this.updatePurchaseState(this.props.ings)}
                                   ordered={this.purchaseHandler} isAuth={this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} purchasedCancelled={this.purchaseCancelHandler}
                                         purchaseContinue={this.purchaseContinueHandler} price={this.props.price}/>;
        };

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

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.authReducer.token!==null
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded:(ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemove:(ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:() => dispatch(actions.purchaseInit),
        onSetRedirectPath: (path)=> dispatch(actions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axiosIns));