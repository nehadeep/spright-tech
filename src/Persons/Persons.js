import Person from "./Person/Person";
import React from "react";


const persons = (props) => {
    return props.persons.map((p, index) => {
        return (
            <Person name={p.name} age={p.age} click={() => props.clicked(index)} key={p.id}/>
        )
    });


};
export default persons