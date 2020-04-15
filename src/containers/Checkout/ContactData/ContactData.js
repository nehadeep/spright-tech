import React , {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css"
import axiosIns from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner";
import {connect} from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../../store/actions/index';
class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            zipCode: ''
       },

    };

    orderHandler =(event)=>{
        event.preventDefault();

        const order=  {
            ingredient : this.props.ings,
            price: this.props.price,
            customer: {
                name: 'Hardeep',
                address : {
                    street : '123 st',
                    zipCode: '12345',
                    country: 'USA',
                },
                email: 'kaur@test.com'

            },
            deliveryMethod: 'fastest',
            userId: this.props.userId
        };

        this.props.onOrderBurger(this.props.token,order)

        // axiosIns.post('/orders.json', order).then(response=>{
        //
        //     this.setState({loading: false});
        //     this.props.history.push('/')
        //
        // }).catch(error=> {
        //
        //     this.setState({loading: false});
        //
        // })
    };

    render() {
        let form = (   <form>
            <input className={classes.input} type="text" name="name" placeholder="name"/>
            <input className={classes.input} type="email" name="email" placeholder="email"/>
            <input className={classes.input} type="text" name="street" placeholder="Street"/>
            <input className={classes.input} type="text" name="zipcode" placeholder="Zip code"/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);

        if(this.props.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter form Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
};

const mapDispatchToProps  = dispatch => {
    return {

        onOrderBurger: (token,orderData) => dispatch(actions.purchaseBurger(token,orderData))
    }

};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axiosIns))