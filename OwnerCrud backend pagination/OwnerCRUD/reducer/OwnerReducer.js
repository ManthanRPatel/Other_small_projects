import { FETCH_OWNERS_REQUEST, FETCH_OWNERS_SUCCESS, FETCH_OWNERS_FAILURE, DELETE_OWNER, HANDLE_INPUT_CHANGE, HANDLE_FILTER_CHANGE, HANDLE_SORTING_CHANGE, ADD_EDIT_OWNER_SUCCESS } from "../AllTypes"


const initialState = {
    loading : true , 
    owners : [],
    error : '',
    message : '',
    searchTop:'',
    currentPage:1,
    rowPerPage :5,
    totalRecords: '',
    // sorting:{ sortingType:'',sortingColumn:'' },
    filters:[]
}


const OwnerReducer = (state = initialState , action)=>{
    switch(action.type){
        
        case FETCH_OWNERS_REQUEST:
            return { ...state , loading: true }

        case FETCH_OWNERS_SUCCESS:
            return {...state , loading:false , owners: action.payload.data ,
            HobbyList:action.payload.HobbyList , totalRecords:action.payload.totalRecords , RoleList :action.payload.RoleList , error:'' }

        case FETCH_OWNERS_FAILURE:
            return {...state ,  loading:false , owners:[] , error:action.payload }

        case DELETE_OWNER:
            return{ ...state , message : action.payload }

        case ADD_EDIT_OWNER_SUCCESS:
            return{...state, message:action.payload }

        case HANDLE_INPUT_CHANGE:
            return {...state, [action.payload.name]:action.payload.value}

        case HANDLE_FILTER_CHANGE:
            const changeFilterId = action.payload.id;
            const changeFilterValue = action.payload.filterValue;
            const changedFilter = { id:changeFilterId ,
                            value:{filterType:'contains' ,
                            filterValue : changeFilterValue } }

            let indexOfFilter = state.filters.findIndex(ele=> ele.id === changeFilterId )

            state.filters[indexOfFilter] = changedFilter

            return{ ...state , filters:[...state.filters ] }

        case HANDLE_SORTING_CHANGE:
            let newSorting = { sortingType:action.payload.sortingType ,
                            sortingColumn: action.payload.sortingColumn }
            return{...state}

        default:
            return state
    }
}

export default OwnerReducer;