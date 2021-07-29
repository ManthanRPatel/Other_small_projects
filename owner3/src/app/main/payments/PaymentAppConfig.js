import React from 'react';
// import {Redirect} from 'react-router-dom';

export const PaymentAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path: '/payment/:paymentToken?',
            component: React.lazy(() => import('./tabs/PaymentApp'))
        },
        {
            path: '/view_invoice/:authToken/:paymentId/:paymentFor',
            component: React.lazy(() => import('./tabs/ViewPaymentInvoice'))
        }
    ]
};