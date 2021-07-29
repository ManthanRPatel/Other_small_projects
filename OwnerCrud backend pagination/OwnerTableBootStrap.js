import React , { useEffect } from 'react'
import {connect} from 'react-redux'

import { fetchOwners, deleteOwner } from '../OwnerActions'



function OwnerContainer({ownerData , fetchOwners ,deleteOwner}) {

    useEffect(()=>{
        fetchOwners()
    },[])

    console.log(ownerData.data)


    if(ownerData.loading){
        return(<h2>Loading...</h2>)
    }
    else if(ownerData.error){
        return<h2> {ownerData.error} </h2>
    }
    else{
        return(
            <table className="table table-striped table-dark">
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Gender</th>
                    <th>Bio</th>
                    <th>Role</th>
                    <th>Hobby</th>
                    <th>Active Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                        ownerData && ownerData.data &&  ownerData.data.map(user =>(
                            <tr key={user.user_id}>
                                <td> {user.full_name} </td>
                                <td> {user.email} </td>
                                <td> {user.mobile_number} </td>
                                <td> {user.gender === "m" ? "Male":(user.gender === "f"?"Female":"Others" )} </td>
                                <td> {user.bio} </td>
                                <td> {user.role} </td>
                                <td> {user.hobby} </td>
                                <td> {user.is_active ? 1 : 0} </td>
                                <td>
                                    <button className="btn btn-dark"
                                     >Edit</button>
                                    <button className="btn btn-info" 
                                    onClick={()=>{  if(window.confirm('Are You Sure want to delete ?')) deleteOwner(user.user_id)}}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }

}


const mapStateToProps = (state) =>{
    return{
        ownerData : state.owners
    }
}

const mapDispatchToProps = ( dispatch ) =>{
    return{
        fetchOwners :()=> dispatch(fetchOwners()),
        deleteOwner: (user_id)=> dispatch(deleteOwner(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerContainer)