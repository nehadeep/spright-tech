import React, {Component} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component{
    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes =(
            <switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to="/"/>
            </switch>
        );

        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/"/>

                </Switch>
            )
        }
        return (
            <div>
               <Layout>
                   {routes}
               </Layout>
            </div>
        );
    }


}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.authReducer.token !==null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
