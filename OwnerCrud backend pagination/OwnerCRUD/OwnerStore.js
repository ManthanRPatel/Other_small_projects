import { createStore ,applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import RootReducer from "./reducer/RootReducer";


const OwnerStore = createStore(
    RootReducer , applyMiddleware(thunk)    
)

export default OwnerStore;
