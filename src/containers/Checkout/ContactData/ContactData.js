import React , {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css"
import axiosIns from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            zipCode: ''
       },
        loading: false

    };

    orderHandler =(event)=>{
        event.preventDefault();
        console.log("this ingred iesn", this.props.ingredients);

        this.setState({loading: true});

        const order=  {
            ingredient : this.props.ingredients,
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
            deliveryMethod: 'fastest'
        };

        axiosIns.post('/orders.json', order).then(response=>{

            this.setState({loading: false});
            this.props.history.push('/')

        }).catch(error=> {

            this.setState({loading: false});

        })
    };

    render() {
        let form = (   <form>
            <input className={classes.input} type="text" name="name" placeholder="name"/>
            <input className={classes.input} type="email" name="email" placeholder="email"/>
            <input className={classes.input} type="text" name="street" placeholder="Street"/>
            <input className={classes.input} type="text" name="zipcode" placeholder="Zip code"/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);

        if(this.state.loading){
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

export default ContactData