import * as Actions from '../actions';
// import _ from '@lodash';

const initialState = {
    routeParams: {},
    passwordSuccess: false,
    cust_auth_token: null,
    cust_account_balance: null,
    paymentData: null,
    showAllInvoice: false,
    ChangeInvoiceAmount: '',
    paymentList: null,
    paymentPayDetailPosition: null,
    paymentPayDetailArr: null,
    clearPaymentPayPosition: null,
    viewAllPaymentData: false,
    payAllPaymentData: false,
    customerData: null,
    updatedCustomerData: null,
    changeCCCustomerData: true,
    paymentSuccessData: null,
    allDataClear: false,
};

const paymentsReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.PASSWORD_SUCCESS:
            {
                return {
                    ...state,
                    passwordSuccess: action.payload
                };
            }
        case Actions.SET_AUTH_TOKEN:
            {
                return {
                    ...state,
                    cust_auth_token: action.payload
                };
            }
        case Actions.RESET_AUTH_TOKEN:
            {
                return {
                    ...state,
                    allDataClear: true,
                    passwordSuccess: false,
                    cust_auth_token: null,
                    cust_account_balance: null,
                    paymentData: null,
                    showAllInvoice: false,
                    paymentList: null,
                    paymentPayDetailArr: null,
                    clearPaymentPayPosition: null,
                    viewAllPaymentData: false,
                    payAllPaymentData: false,
                    customerData: null,
                    updatedCustomerData: null,
                    changeCCCustomerData: true,
                    paymentSuccessData: null,
                };
            }
        case Actions.SET_ACCOUNT_BALANCE:
            {
                return {
                    ...state,
                    cust_account_balance: action.payload
                };
            }
        case Actions.GET_PAYMENT_DATA:
            {
                return {
                    ...state,
                    paymentData: action.payload,
                };
            }
        case Actions.RESET_PAYMENT_DATA:
            {
                return {
                    ...state,
                    paymentData: null,
                };
            }
        case Actions.CHANGE_INVOICE_VIEW:
            {
                return {
                    ...state,
                    showAllInvoice: action.payload,
                };
            }
        case Actions.CHANGE_INVOICE_VIEW_PAYMENT_AMOUNT:
            {
                return {
                    ...state,
                    ChangeInvoiceAmount: action.payload,
                };
            }
        case Actions.GET_PAYMENT_LIST:
            {
                return {
                    ...state,
                    paymentList: action.payload,
                };
            }
        case Actions.RESET_PAYMENT_LIST:
            {
                return {
                    ...state,
                    paymentList: null,
                };
            }
        case Actions.SET_PAY_PAYMENT_OBJECT_POSITION:
            {
                return {
                    ...state,
                    paymentPayDetailPosition: action.payload
                };
            }
        case Actions.SET_PAY_PAYMENT_OBJECT:
            {
                return {
                    ...state,
                    paymentPayDetailArr: action.payload
                };
            }
        case Actions.SET_CLEAR_PAY_PAYMENT_OBJECT_POSITION:
            {
                return {
                    ...state,
                    clearPaymentPayPosition: action.payload
                };
            }
        case Actions.SET_VIEW_ALL_PAYMENT_LIST:
            {
                return {
                    ...state,
                    viewAllPaymentData: action.payload
                };
            }
        case Actions.SET_PAY_ALL_PAYMENT_LIST:
            {
                return {
                    ...state,
                    payAllPaymentData: action.payload
                };
            }
        case Actions.GET_CUSTOMER_DATA:
            {
                return {
                    ...state,
                    customerData: action.payload,
                };
            }
        case Actions.RESET_CUSTOMER_DATA:
            {
                return {
                    ...state,
                    customerData: null,
                };
            }
        case Actions.UPDATED_CUSTOMER_DATA:
            {
                return {
                    ...state,
                    updatedCustomerData: action.payload,
                };
            }
        case Actions.CHANGE_CC_CUSTOMER_DATA:
            {
                return {
                    ...state,
                    changeCCCustomerData: action.payload,
                };
            }
        case Actions.ADD_PAYMENT_DATA:
            {
                return {
                    ...state,
                    paymentSuccessData: action.payload,
                };
            }
        case Actions.RESET_ADD_PAYMENT_DATA:
            {
                return {
                    ...state,
                    paymentSuccessData: null,
                };
            }
        case Actions.ALL_DATA_CLEAR_CALL:
            {
                return {
                    ...state,
                    allDataClear: action.payload,
                };
            }
        default:
            {
                return state;
            }
    }
};

export default paymentsReducer;