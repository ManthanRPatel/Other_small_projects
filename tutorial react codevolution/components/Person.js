import React from 'react'

function Person({person , key}) {
    return (
        <div>{key}
            <h2>I am :: <b>{person.name}</b>,,,
            <br /> My age <b>{person.age}</b>,,,,,
            <br /> my Skill <i>{person.skill}</i> 
            </h2>
        </div>
    )
}

export default Person
