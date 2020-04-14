import * as actionTypes from './actionsTypes';
import axiosIns from "../../axios-orders";

export const addIngredient = (name) =>{
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};
export const removeIngredient = (name) =>{
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};
export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FAILED,
    }
};

export const initIngredients = ()=>{
    return dispatch =>{ //action creator from thunk async
        axiosIns.get('https://react-burger-35f1f.firebaseio.com/ingredients.json').then(response=>{
            dispatch(setIngredients(response.data))
        }).catch(error => {
            dispatch(fetchIngredientsFailed())
        });
    }
}
