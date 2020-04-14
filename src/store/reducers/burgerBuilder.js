import * as actionType from '../actions/actionsTypes';

const initialState = {
    ingredient :null,
    totalPrice: 4,
    error: false
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.5,
    bacon: 0.7
};

const reducer = (state=initialState, action)=>{
     switch (action.type) {
         case actionType.ADD_INGREDIENT:
             return {
                 ...state,
                 ingredient: {
                     ...state.ingredient,
                     [action.ingredientName]: state.ingredient[action.ingredientName] +1
                 },
                 totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
             };
         case actionType.REMOVE_INGREDIENT:
             return{
                 ...state,
                 ingredient: {
                     ...state.ingredient,
                     [action.ingredientName]: state.ingredient[action.ingredientName] -1
                 },
                 totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

             };
         case actionType.SET_INGREDIENTS:
             return {
                 ...state,
                 ingredient: action.ingredients,
                 totalPrice: 4,
                 error: false
             };
         case actionType.FAILED:
             return {
                 ...state,
                 error: true
             };
         default:
             return state;
     }
     return state;
};

export default reducer;