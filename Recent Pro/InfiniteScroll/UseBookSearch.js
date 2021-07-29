import {useEffect , useState} from 'react'
import axios from 'axios'

function UseBookSearch(query , pageNumber) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(()=>{
        setBooks([])
    },[query])
    
    useEffect(() => {

        setLoading(true)
        setError(false)

        let cancel;

        axios({
            method:'GET',
            url:'http://jsonplaceholder.typicode.com/posts/'+ pageNumber +'/comments',
            params:{ q:query },
            cancelToken: new axios.CancelToken(c=> cancel = c )
        }).then(res=>{
            setBooks(prevBook=>{
                return [...new Set([...prevBook ,...res.data.map(a=> a.body ) ])]
            })
            setHasMore( res.data.length > 0 )
            setLoading(false)
            console.log(res.data)
        }).catch(e=>{
            if(axios.isCancel(e)) return
            setError(true)
        })

        return ()=> cancel()

    }, [query , pageNumber])

    return (
        {
            loading , error , books ,hasMore
        }
    )
}

export default UseBookSearch
