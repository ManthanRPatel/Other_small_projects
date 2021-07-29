import { combineReducers } from 'redux';
import payments from './payments.reducer';

const reducer = combineReducers({
    payments,
});

export default reducer;
