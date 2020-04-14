import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axiosIns from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component{

    componentDidMount() {
       this.props.onFetchOrders();
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
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: ()=> dispatch(actions.fetchOrders())
    }
};

export default connect(mapStatesToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosIns));