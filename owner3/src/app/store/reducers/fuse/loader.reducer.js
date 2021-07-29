import * as Actions from '../../actions/fuse/index';

const initialState = {
    linearProgressDisplay: {
        progressDisplay: false
    },
    paymentLoaders: {
        passwordLoader: false,
        partialAmountLoader: false,
        addPaymentLoader: false
    }
};

const loader = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SHOW_LOADER:
            {
                // console.log('called SHOW_LOADER in loader reducer @@@@', action.payload)
                switch (action.payload.name) {
                    case 'PROGRESS_LOADER':
                        {
                            return {
                                ...state,
                                linearProgressDisplay: {
                                    progressDisplay: action.payload.status
                                }
                            }
                        }
                    case 'PASSWORD_LOADER':
                        {
                            return {
                                ...state,
                                paymentLoaders: {
                                    passwordLoader: action.payload.status
                                },
                                linearProgressDisplay: {
                                    progressDisplay: action.payload.status
                                }
                            }
                        }
                    case 'PARTIAL_AMOUNT_LOADER':
                        {
                            return {
                                ...state,
                                paymentLoaders: {
                                    partialAmountLoader: action.payload.status
                                },
                                linearProgressDisplay: {
                                    progressDisplay: action.payload.status
                                }
                            }
                        }
                    case 'ADD_PAYMENT_LOADER':
                        {
                            return {
                                ...state,
                                paymentLoaders: {
                                    addPaymentLoader: action.payload.status
                                },
                                linearProgressDisplay: {
                                    progressDisplay: action.payload.status
                                }
                            }
                        }
                    default:
                        {
                            return state;
                        }
                }
            }
        default:
            {
                return state;
            }
    }
};

export default loader;
