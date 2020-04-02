import React, {Component} from 'react';
import './App.css';
import Person from "./Person/Person";
import styled from "styled-components";

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
        const StyledButton = styled.button`
            cursor : pointer;
            background-color: ${props=>props.alt?'blue': 'red'};
            color: white;
            &:hover: {
                background-color: lightgreen;
                color: black;
            }
        `;
        let person = null;
        if(this.state.isShow) {
            person = (
            <div>
                {this.state.persons.map((p, index)=>{
                   return <Person name={p.name} age={p.age} click={()=>this.deletePerson(index)} key={p.id}/>
                })}
            </div>
            );

        }
        return (
            <div className="App">
                <header className="App-header">
                    <h1> Welcome to my First React app.</h1>
                </header>
                <StyledButton alt={this.state.isShow} onClick={this.toggle}>toggle </StyledButton>
                {person}

            </div>
        );
    }


}

export default App;
