import React, {Component} from 'react';
import './App.css';
import Person from "./Person/Person";

class App extends Component{
    state = {
        persons : [
            {
                name: "Hardeep", age: 29
            },
            {
                name: "Sunny" , age: 34
            }
        ]
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1> Welcome to my First React app.</h1>
                </header>
                <button onClick={this.switchName}>Switch Name</button>
                <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person> My Hobbies</Person>
            </div>
        );
    }


}

export default App;
