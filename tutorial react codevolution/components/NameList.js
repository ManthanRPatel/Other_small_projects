import React from 'react'
import Person from './Person'

<NameList />

function NameList() {
    const names = ['Bruce','Clark','diana','Bruce']

    const person =[
        {
            id:1,
            name:'Bruce Wyne',
            age:30,
            skill :'billionre'
        },
        {
            id:2,
            name:'Joker Gotham',
            age:34,
            skill :'Evil'
        },
        {
            id:3,
            name:'Diana clak',
            age:25,
            skill :'Wonder Women'
        },
        {
            id:4,
            name:'Tony stark',
            age:35,
            skill :'Iron Man'
        }
    ]

    const nameList = names.map((name,index) => <h2 key={index} > {index}=={name} </h2> )

    // const personList = person.map(person => 
    //     <Person key={person.id} person={person}></Person>);
    return (
        <div>
            {nameList}
            {/* {personList} */}
        </div>
    )
}

export default NameList
