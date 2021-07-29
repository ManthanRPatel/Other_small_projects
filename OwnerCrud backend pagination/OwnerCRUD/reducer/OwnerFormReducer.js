import { HANDLE_INPUT_CHANGE , HANDLE_FILE_UPLOAD_CHANGE ,HANDLE_SWITCH_CHANGE,HANDLE_CHECKBOX_CHANGE, OPEN_ADD_EDIT_MODAL, CLOSE_ADD_EDIT_MODAL } from "../AllTypes"


export const initialFormState = {
    actionType: 'add',
    fullName:'',
    email:'',
    mobileNumber:'',
    bio:'',
    gender:'m',
    isActive:false,
    role:'',
    userId:null,
    hobby:[],
    profilePic : null,
    modalIsOpen:false
}


const OwnerFormReducer = (state = initialFormState , action)=>{
    switch(action.type){
        case HANDLE_INPUT_CHANGE:
            return {...state, [action.payload.name]:action.payload.value}

        case HANDLE_CHECKBOX_CHANGE:
            // console.log("action.payload == ",action.payload)
            // console.log("action.payload.checked == ",action.payload.checked )
            
            const addHobby = action.payload.value;
            let newHobby = [...state.hobby];
            if(newHobby.find(hb => hb === addHobby) !== undefined) {
                newHobby = newHobby.filter(hb => hb !== addHobby);
            }else{
                newHobby = [...newHobby, addHobby];
            }
            return {  ...state, hobby: newHobby };

        case HANDLE_SWITCH_CHANGE:
            return {...state, isActive: !state.isActive }

        case HANDLE_FILE_UPLOAD_CHANGE:
            return { ...state , profilePic: action.payload.files[0] }

        case OPEN_ADD_EDIT_MODAL:
            // console.log("action.payload.formFillData" , action.payload )
            return { ...state, ...action.payload ,modalIsOpen:true }

        case CLOSE_ADD_EDIT_MODAL:
            return{ ...initialFormState}

        default:
            return state
    }
}

export default OwnerFormReducer;