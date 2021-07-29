import { HANDLE_INPUT_CHANGE, HANDLE_SWITCH_CHANGE, HANDLE_CHECKBOX_CHANGE,OPEN_ADD_EDIT_MODAL,
     HANDLE_FILE_UPLOAD_CHANGE, CLOSE_ADD_EDIT_MODAL } from "../AllTypes"
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { initialFormState } from '../reducer/OwnerFormReducer'
import { fetchOwners, addEditSuccess } from "./OwnerActions"
toast.configure()



export const handleInputChange = (inputTarget) =>{
    // console.log("handleInputChange actions called")
    return{
        type: HANDLE_INPUT_CHANGE,
        payload: inputTarget
    }
}
export const handleSwitchChange = (inputTarget)=>{
    // console.log("handleSwitchChange actions called")
    return{
        type: HANDLE_SWITCH_CHANGE,
        payload: inputTarget
    }
}
export const handleCheckBoxChange = (inputTarget) =>{
    // console.log("handleCheckBoxChange is called")
    return{
        type: HANDLE_CHECKBOX_CHANGE,
        payload: inputTarget
    }
}
export const handleFileUploadChange = (inputTarget) =>{
    // console.log("handleFileUploadChange is called",inputTarget)
    return{
        type: HANDLE_FILE_UPLOAD_CHANGE,
        payload: inputTarget
    }
}

export const openAddEDitModal = (formFillData= initialFormState ) =>{
    // console.log("formFillData actions === ",formFillData)
    return{
        type: OPEN_ADD_EDIT_MODAL,
        payload:formFillData
    }
}
export const closeAddEDitModal = ( ) =>{
    return{
        type: CLOSE_ADD_EDIT_MODAL
    }
}


export const addEditOwner = (UserData) =>{
    return(dispatch)=>{

        const fd = new FormData()
        fd.append('profile_pic', UserData.profilePic)
        fd.append('action_type',UserData.actionType )
        fd.append('user_id',UserData.userId )
        fd.append('full_name', UserData.fullName )
        fd.append('mobile_number', UserData.mobileNumber )
        fd.append('email', UserData.email )
        fd.append('gender',UserData.gender )
        fd.append('bio', UserData.bio )
        fd.append('role',UserData.role )
        fd.append('hobby',UserData.hobby )
        fd.append('is_active', UserData.isActive )

        console.log("fd ===",fd)

        axios.post('http://localhost:8080/addEditUserUpload',  fd )
        .then(response =>{
            console.log("response ===",response)
            if(response.data.status === true){
                toast.success(response.data.message ,{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }else{
                toast.error(response.data.message ,{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            }
            dispatch(closeAddEDitModal())
            dispatch(addEditSuccess(response.data.message))
        })
        .catch(err=>{
            toast.error(err.message.message ,{position:toast.POSITION.TOP_CENTER,autoClose:8000})
            dispatch(closeAddEDitModal())
        })
    }
}