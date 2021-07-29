import React from 'react'

/// tut with errorboundary.js for error handling


                // <ErrorBoundary>
				// 	<Hero heroName="Batman" />
				// </ErrorBoundary>
				// <ErrorBoundary>
				// 	<Hero heroName="Superman" />
				// </ErrorBoundary>
				// <ErrorBoundary>
				// 	<Hero heroName="Joker" />
				// </ErrorBoundary>



function Hero({heroName}) {
    if( heroName === "Joker" ){
        throw new Error('Not a hero')
    }
    return (
        <h1>
            {heroName}
        </h1>
    )
}

export default Hero
