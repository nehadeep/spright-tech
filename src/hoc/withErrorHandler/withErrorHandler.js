import React, {Component} from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{
        state = {
            Error : null
        };
        reqInterceptor: number;
        resInterceptor: number;
        componentWillMount() {
           this.reqInterceptor= axios.interceptors.request.use(req => {
                this.setState({Error: null});
                return req;
            });
           this.resInterceptor= axios.interceptors.response.use(res=>res, error => {
                this.setState({Error: error})
            });
        }
        errorConfirmedHandler = () =>{
            this.setState({Error: null});

        };

        componentWillUnmount(): void {
            console.log("will unmount", this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)

        }

        render (){
            return (
                <Aux>
                    <Modal show={this.state.Error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.Error ? this.state.Error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
        }
    };

export default withErrorHandler;