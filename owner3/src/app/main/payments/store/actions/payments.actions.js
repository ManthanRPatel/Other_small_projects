import paymentService from 'app/services/paymentService';
import * as Actions from 'app/store/actions';

export const PASSWORD_SUCCESS = '[PAYMENT APP] PASSWORD_SUCCESS';
export const SET_AUTH_TOKEN = '[PAYMENT APP] SET_AUTH_TOKEN';
export const RESET_AUTH_TOKEN = '[PAYMENT APP] RESET_AUTH_TOKEN';
export const SET_ACCOUNT_BALANCE = '[PAYMENT APP] SET_ACCOUNT_BALANCE';
export const RESET_ACCOUNT_BALANCE = '[PAYMENT APP] RESET_ACCOUNT_BALANCE';
export const GET_PAYMENT_DATA = '[PAYMENT APP] GET_PAYMENT_DATA';
export const RESET_PAYMENT_DATA = '[PAYMENT APP] RESET_PAYMENT_DATA';
export const CHANGE_INVOICE_VIEW = '[PAYMENT APP] CHANGE_INVOICE_VIEW';
export const CHANGE_INVOICE_VIEW_PAYMENT_AMOUNT = '[PAYMENT APP] CHANGE_INVOICE_VIEW_PAYMENT_AMOUNT';
export const GET_PAYMENT_LIST = '[PAYMENT APP] GET_PAYMENT_LIST';
export const RESET_PAYMENT_LIST = '[PAYMENT APP] RESET_PAYMENT_LIST';
export const SET_PAY_PAYMENT_OBJECT_POSITION = '[PAYMENT APP] SET_PAY_PAYMENT_OBJECT_POSITION';
export const SET_PAY_PAYMENT_OBJECT = '[PAYMENT APP] SET_PAY_PAYMENT_OBJECT';
export const SET_CLEAR_PAY_PAYMENT_OBJECT_POSITION = '[PAYMENT APP] SET_CLEAR_PAY_PAYMENT_OBJECT_POSITION';
export const SET_VIEW_ALL_PAYMENT_LIST = '[PAYMENT APP] SET_VIEW_ALL_PAYMENT_LIST';
export const SET_PAY_ALL_PAYMENT_LIST = '[PAYMENT APP] SET_PAY_ALL_PAYMENT_LIST';
export const GET_CUSTOMER_DATA = '[PAYMENT APP] GET_CUSTOMER_DATA';
export const RESET_CUSTOMER_DATA = '[PAYMENT APP] RESET_CUSTOMER_DATA';
export const UPDATED_CUSTOMER_DATA = '[PAYMENT APP] UPDATED_CUSTOMER_DATA';
export const CHANGE_CC_CUSTOMER_DATA = '[PAYMENT APP] CHANGE_CC_CUSTOMER_DATA';
export const ADD_PAYMENT_DATA = '[PAYMENT APP] ADD_PAYMENT_DATA';
export const RESET_ADD_PAYMENT_DATA = '[PAYMENT APP] RESET_ADD_PAYMENT_DATA';
export const ALL_DATA_CLEAR_CALL = '[PAYMENT APP] ALL_DATA_CLEAR_CALL';

export function customerVerification(passData) {
    return (dispatch) =>
        paymentService.customerVerification(passData).then((response) => {
            const { data } = response//message,
            Promise.all([
                dispatch({
                    type: GET_PAYMENT_DATA,
                    payload: data
                })
            ]).then(() => {
                if (data.customer_data) {
                    if (data.customer_data.auth_token) {
                        dispatch(setAuthToken(data.customer_data.auth_token));
                    }
                    if (data.customer_data.balance_amount) {
                        dispatch(setAccountBalance(data.customer_data.balance_amount));
                    }
                }
                // dispatch(Actions.showMessage({ message, variant: 'success' }));
                dispatch(passwordVerifySuccess(true));
                return dispatch(Actions.showLoader('PASSWORD_LOADER', false))
            })
        }).catch(error => {
            console.log('error :', error);
            dispatch({
                type: RESET_PAYMENT_DATA
            })
            dispatch(passwordVerifySuccess(false));
            dispatch(Actions.showMessage({ message: error.message }));
            return dispatch(Actions.showLoader('PASSWORD_LOADER', false));
        });
}

export function getPaymentList(authToken, customerID, start, paymentFor, fromCall) {
    return (dispatch) =>
        paymentService.getPaymentList(authToken, customerID, start, paymentFor)
            .then((response) => {
                const { data } = response;
                dispatch({
                    type: GET_PAYMENT_DATA,
                    payload: data
                })
                if (fromCall === 'full_payment_list') {
                    dispatch(changeInvoicePaymentAmount('full_payment_list'));
                }
                return dispatch(Actions.showLoader('PROGRESS_LOADER', false));
            }).catch(error => {
                console.log('error :', error);
                // dispatch({
                //     type: RESET_PAYMENT_DATA
                // })
                if (error.responseCode && error.responseCode === 401) {
                    dispatch(resetAuthToken());
                }
                dispatch(Actions.showMessage({ message: error.message }))
                return dispatch(Actions.showLoader('PROGRESS_LOADER', false));
            });
}

export function getCustomerPaymentInformation(authToken, customerID, start, paymentData) {
    return (dispatch) =>
        paymentService.getCustomerPaymentInformation(authToken, customerID, start, paymentData)
            .then((response) => {
                const { data } = response;
                dispatch({
                    type: GET_CUSTOMER_DATA,
                    payload: data
                })
                return dispatch(Actions.showLoader('PARTIAL_AMOUNT_LOADER', false));
            }).catch(error => {
                console.log('error :', error);
                dispatch({
                    type: RESET_CUSTOMER_DATA
                })
                if (error.responseCode && error.responseCode === 401) {
                    dispatch(resetAuthToken());
                }
                dispatch(Actions.showMessage({ message: error.message }))
                return dispatch(Actions.showLoader('PARTIAL_AMOUNT_LOADER', false));
            });
}

export function paymentAddApiCall(passData) {
    return (dispatch) =>
        paymentService.paymentAddApiCall(passData)
            .then((response) => {
                const { data } = response;
                dispatch({
                    type: ADD_PAYMENT_DATA,
                    payload: data
                })
                return dispatch(Actions.showLoader('ADD_PAYMENT_LOADER', false));
            }).catch(error => {
                console.log('error :', error);
                dispatch({
                    type: RESET_ADD_PAYMENT_DATA
                })
                if (error.responseCode && error.responseCode === 401) {
                    dispatch(resetAuthToken());
                }
                dispatch(Actions.showMessage({ message: error.message }))
                return dispatch(Actions.showLoader('ADD_PAYMENT_LOADER', false));
            });
}

//for payment
export function passwordVerifySuccess(event) {
    return {
        type: PASSWORD_SUCCESS,
        payload: event
    }
}

export function setAuthToken(event) {
    return {
        type: SET_AUTH_TOKEN,
        payload: event
    }
}

export function resetAuthToken() {
    return {
        type: RESET_AUTH_TOKEN
    }
}

export function setAccountBalance(event) {
    return {
        type: SET_ACCOUNT_BALANCE,
        payload: event
    }
}

export function changeInvoiceFullView(data) {
    return {
        type: CHANGE_INVOICE_VIEW,
        payload: data
    }
}

export function changeInvoicePaymentAmount(data) {
    return {
        type: CHANGE_INVOICE_VIEW_PAYMENT_AMOUNT,
        payload: data
    }
}

export function assignPaymentListData(data) {
    return {
        type: GET_PAYMENT_LIST,
        payload: data
    }
}

export function setPayPaymentObjectArrPosition(event) {
    return {
        type: SET_PAY_PAYMENT_OBJECT_POSITION,
        payload: event
    }
}

export function setPayPaymentObjectArr(event) {
    return {
        type: SET_PAY_PAYMENT_OBJECT,
        payload: event
    }
}

export function setClearPayPaymentObjectArrPosition(event) {
    return {
        type: SET_CLEAR_PAY_PAYMENT_OBJECT_POSITION,
        payload: event
    }
}

export function setViewAllPaymentListData(event) {
    return {
        type: SET_VIEW_ALL_PAYMENT_LIST,
        payload: event
    }
}

export function setPayAllPaymentListData(event) {
    return {
        type: SET_PAY_ALL_PAYMENT_LIST,
        payload: event
    }
}

export function resetCustomerData() {
    return {
        type: RESET_CUSTOMER_DATA
    }
}

export function saveUpdatedCustomerData(event) {
    return {
        type: UPDATED_CUSTOMER_DATA,
        payload: event
    }
}

export function changeCCCustomerDataDetails(event) {
    return {
        type: CHANGE_CC_CUSTOMER_DATA,
        payload: event
    }
}

export function resetAddPaymentData() {
    return {
        type: RESET_ADD_PAYMENT_DATA
    }
}

export function allAppDataClear(event) {
    return {
        type: ALL_DATA_CLEAR_CALL,
        payload: event
    }
}