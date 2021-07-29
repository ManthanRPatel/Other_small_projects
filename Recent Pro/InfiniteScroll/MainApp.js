import React,{ useState,useCallback ,useRef } from 'react'
import axios from 'axios'
import UseBookSearch from './UseBookSearch'

function MainApp() {

    const [query, setquery] = useState('')
    const [pageNumber, setpageNumber] = useState(1)
    const { loading , error , books ,hasMore } = UseBookSearch(query ,pageNumber);

    const observer = useRef()
    const lastBookElementRef = useCallback(node=>{

        if( loading ) return

        if(observer.current) observer.current.disconnect() 

        observer.current = new IntersectionObserver(entries => {

            if( entries[0].isIntersecting && hasMore ){
                setpageNumber(prev=> prev+1 )
                console.log("visible")
            }

        },[loading , hasMore])

        if(node) observer.current.observe(node)
        
        console.log(node)
    })

    function handleSearch(e){
        setquery(e.target.value)
        setpageNumber(1)
    }

    return (
        <>
            <input type="text" value={query} onChange={handleSearch}  />

            {books.map((book,index)=>{
                if( books.length === index +1 ){
                    return(
                        <div key={book} ref={lastBookElementRef} >
                            {book}
                        </div>)
                }else{
                    return(
                        <div key={book} >
                            {book}
                        </div>)
                }
                
            })}

            <div>{ loading && 'Loading...' }</div>
            <div>{ error && 'Error...' }</div>
        </>
    )
}

export default MainApp
