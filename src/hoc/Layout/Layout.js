
import React, {Component} from "react";
import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
class Layout  extends Component{
    state = {
        showSideDrawer: false
    };
    sideDrawerClosed =()=>{
        this.setState({showSideDrawer: false})
    };
    SideDrawerToggleClicked = ()=>{
        this.setState((prevState)=>{
          return   {showSideDrawer: !prevState.showSideDrawer}
        })
    };
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.SideDrawerToggleClicked}/>
                <SideDrawer isAuth={this.props.isAuthenticated} closed={this.sideDrawerClosed} open={this.state.showSideDrawer}/>
                <div>Toolbar, Side drawer, Backdrop</div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};
const mapStateToProps = state => {
    return {
        isAuthenticated : state.authReducer.token!==null,
    }
};


export default connect(mapStateToProps)(Layout);