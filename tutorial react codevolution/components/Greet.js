import React from 'react'

// {/* <Greet name="Bruce Wayne" heroName="Batman" /> */}

const Greet = ( props ) => {
    const {name, heroName} = props;

    console.log({name, heroName});
return(
<div>
    <h1>{name} AKA {heroName},,,...</h1>
</div>
    ) 
}


export default Greet