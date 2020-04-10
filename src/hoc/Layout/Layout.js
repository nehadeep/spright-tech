
import React, {Component} from "react";
import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout  extends Component{
    state = {
        showSideDrawer: false
    };
    sideDrawerClosed =()=>{
        this.setState({showSideDrawer: true})
    };
    SideDrawerToggleClicked = ()=>{
        this.setState((prevState)=>{
          return   {showSideDrawer: !prevState.showSideDrawer}
        })
    };
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleClicked}/>
                <SideDrawer closed={this.sideDrawerClosed} open={this.state.showSideDrawer}/>
                <div>Toolbar, Side drawer, Backdrop</div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;