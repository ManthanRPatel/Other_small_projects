import { combineReducers } from 'redux'
import OwnerReducer from './OwnerReducer'
import OwnerFormReducer from './OwnerFormReducer'


const RootReducer = combineReducers({
    owner: OwnerReducer,
    form: OwnerFormReducer
})

export default RootReducer;