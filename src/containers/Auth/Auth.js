import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {checkValidity} from "../../Shared/utility";

class Auth extends Component{
    state = {
        controls : {
            email : {
                elementType: 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation : {
                    required: true,
                    isEmail: true
             },
                valid: false,
                touched: false
            },
            password : {
                elementType: 'input',
                elementConfig : {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation : {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    componentDidMount() {
        if(!this.props.burgerBuilding && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            },

        };

        this.setState({controls: updatedControls});
    };

    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    };

    switchAuthModeHandler = ()=>{
        this.setState(prevState=>{
            return {isSignup: !prevState.isSignup}
        })
    }


    render() {
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElem =>(
            <Input key={formElem.id}
                   elementType={formElem.config.elementType}
                   elementConfig={formElem.config.elementConfig}
                   value={formElem.config.value}
                   invalid={!formElem.config.valid}
                   shouldValidate={formElem.config.validation}
                   touched={formElem.config.touched}
                   changed={(event) => this.inputChangedHandler(event, formElem.id)} />
        ));
        if(this.props.loading){
            form = <Spinner/>;
        }
        let errMsg = null;

        if(this.props.error){
            errMsg = <p>{this.props.error.message}</p>
        }
        let authRedirect= null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.onSetAuthRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>

                </form>
                <Button clicked={this.switchAuthModeHandler} btnType="Danger">Switch to {this.state.isSignup?'SIGNIN': 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStatesToProps = state =>{
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token!==null,
        burgerBuilding: state.burgerBuilder.building,
        authRedirectPath: state.authReducer.authRedirectPath
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }

};

export default connect(mapStatesToProps, mapDispatchToProps)(Auth);