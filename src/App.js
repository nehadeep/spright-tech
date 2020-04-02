import React, {Component} from 'react';
import './App.css';
import Persons from "./Persons/Persons";
import Cockpit from "./Cockpit/Cockpit";

class App extends Component{
    state = {
        persons : [
            {
               id: 1, name: "Hardeep", age: 29
            },
            {
               id: 2, name: "Sunny" , age: 34
            }
        ],
        isShow: true
    };

    switchName = ()=>{
        console.log("clicked");
        this.setState({
            persons : [
                {
                    name: "Hardeep1", age: 30
                },
                {
                    name: "Sunny1" , age: 35
                }
            ]
        })
    }

    toggle = ()=>{
        const showP = this.state.isShow;
        this.setState({isShow: !showP})
    };
    deletePerson= (pIndex)=> {
        const persons = [...this.state.persons];
        persons.splice(pIndex, 1)
        this.setState({persons: persons});
    };

    render() {
        // const StyledButton = styled.button`
        //     cursor : pointer;
        //     background-color: ${props=>props.alt?'blue': 'red'};
        //     color: white;
        //     &:hover: {
        //         background-color: lightgreen;
        //         color: black;
        //     }
        // `;
        let person = null;
        if(this.state.isShow) {
            person = <Persons persons={this.state.persons}  clicked={this.deletePerson}/>

        }
        return (
            <div className="App">
            <Cockpit showPersons = {this.state.isShow} clicked = {this.toggle}/>
            {person}
            </div>
        );
    }


}

export default App;
