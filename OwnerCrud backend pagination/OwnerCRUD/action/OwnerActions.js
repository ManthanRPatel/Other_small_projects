import { FETCH_OWNERS_REQUEST, FETCH_OWNERS_SUCCESS, FETCH_OWNERS_FAILURE, DELETE_OWNER, HANDLE_INPUT_CHANGE, HANDLE_FILTER_CHANGE, ADD_EDIT_OWNER_SUCCESS } from '../AllTypes'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

export const fetchOwnerRequest = () =>{
    return{
        type: FETCH_OWNERS_REQUEST
    }
}

export const fetchOwnerSuccess = ( owners )=>{
    return {
        type: FETCH_OWNERS_SUCCESS,
        payload: owners
    }
}

export const fetchOwnerFailure = ( error ) =>{
    return{
        type: FETCH_OWNERS_FAILURE,
        payload: error
    }
}

export const handleInputChange = (inputTarget) =>{
    return{
        type:HANDLE_INPUT_CHANGE,
        payload:inputTarget
    }
}

export const handleFilterChange = ( filterdetails )=>{
    return{
        type: HANDLE_FILTER_CHANGE,
        payload:filterdetails
    }
}


export const fetchOwners = (filterData) =>{

    console.log("fetch owner called :==>",filterData)
    return(dispatch)=>{

        dispatch(fetchOwnerRequest());

        // if( filterData.loading === true ){
            axios.post('http://localhost:8080/filterUsers',
            { rowPerPage: filterData.rowPerPage , currentPage:filterData.currentPage ,
                searchTop:filterData.searchTop , fil_fullName:filterData.filters
            })
            .then(response =>{
                dispatch(fetchOwnerSuccess(response.data))
            })
            .catch(err=>{
                const errorMsg = err.message
                dispatch(fetchOwnerFailure(errorMsg))
            })
        // }
        
    }
}

export const deleteOwnerSuccess = (message)=>{
    return{
        type: DELETE_OWNER,
        payload:message
    }
}

export const addEditSuccess = (message)=>{
    return{
        type: ADD_EDIT_OWNER_SUCCESS,
        payload:message
    }
}


export const deleteOwner = ( user_id ) => {
    return(dispatch)=>{
        axios.post('http://localhost:8080/deleteUser',{ user_id : user_id })
        .then(response =>{
            const message = response.data
            toast.success(response.data.message ,{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            dispatch(deleteOwnerSuccess(message))
        })
        .catch(err=>{
            toast.error(err.message.message ,{position:toast.POSITION.TOP_CENTER,autoClose:8000})
        })
    }
}
