import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axiosIns from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component{

    componentDidMount() {
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner/>;
        if(!this.props.loading) {
              orders= this.props.orders.map(order => (

                        <Order key={order.id} ingredients={order.ingredient} price={+order.price}/>

                    ))

        }
        return (
            <div>
            {orders}
            </div>
        );
    }
}

const mapStatesToProps = state =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: (token, userId)=> dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStatesToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosIns));