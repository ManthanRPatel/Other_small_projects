import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';

class paymentService extends FuseUtils.EventEmitter {
    customerVerification = (passData) => {
        return new Promise((resolve, reject) => {
            const request = axios({
                method: 'post',
                url: 'customerVerification',
                data: passData
            })
            request.then((response) => {
                const { status, message, data } = response.data;
                if (status) {
                    // if (data.customer_data && data.customer_data.auth_token) {
                    //     axios.defaults.headers.common['auth_token'] = data.customer_data.auth_token;
                    // }
                    resolve({ message, data });
                } else {
                    reject({ message });
                }
            }).catch((error) => {
                console.log('customerVerification error ' + error);
                if (error.response && error.response.status === 401) {
                    reject({ responseCode: error.response.status, message: 'Invalid/expired authentication token!' });
                }
                else {
                    reject({ message: 'Something went wrong!!' });
                }
            })
        });
    };

    getPaymentList = (authToken, customerID, start, paymentFor) => {
        return new Promise((resolve, reject) => {
            const request = axios.get('paymentList?auth_token=' + authToken + '&customer_id=' + customerID + '&start=' + start + '&payment_for=' + paymentFor)
            // const request = axios.get('paymentList?' + 'customer_id=' + customerID + '&start=' + start + '&payment_for=' + paymentFor, {
            //     params: { 'customer_id': customerID, 'start': start, 'payment_for': paymentFor }
            // })
            request.then((response) => {
                const { status, message, data } = response.data;//limit,
                if (status) {
                    resolve({ data });
                } else {
                    reject({ message });
                }
            }).catch((error) => {
                console.log('getPaymentList error ' + error);
                if (error.response && error.response.status === 401) {
                    reject({ responseCode: error.response.status, message: 'Invalid/expired authentication token!' });
                }
                else {
                    reject({ message: 'Something went wrong!!' });
                }
            })
        });
    };

    getCustomerPaymentInformation = (passData) => {
        return new Promise((resolve, reject) => {
            const request = axios({
                method: 'post',
                url: 'customerPaymentInformation',
                data: passData
            })
            request.then((response) => {
                const { status, message, data } = response.data;
                if (status) {
                    resolve({ message, data });
                } else {
                    reject({ message });
                }
            }).catch((error) => {
                console.log('getCustomerPaymentInformation error ' + error);
                if (error.response && error.response.status === 401) {
                    reject({ responseCode: error.response.status, message: 'Invalid/expired authentication token!' });
                }
                else {
                    reject({ message: 'Something went wrong!!' });
                }
            })
        });
    };

    // getCustomerPaymentInformation = (authToken, customerID, start, paymentData) => {
    //     return new Promise((resolve, reject) => {
    //         //'&payment_id=' + paymentId + '&payment_for=' + paymentFor + 
    //         const request = axios.get('customerPaymentInformation?auth_token=' + authToken + '&customer_id=' + customerID + '&start=' + start + '&payment_data=' + paymentData)
    //         request.then((response) => {
    //             const { status, message, data } = response.data;
    //             if (status) {
    //                 resolve({ data });
    //             } else {
    //                 reject({ message });
    //             }
    //         }).catch((error) => {
    //             console.log('getCustomerPaymentInformation error ' + error);
    //             if (error.response && error.response.status === 401) {
    //                 reject({ responseCode: error.response.status, message: 'Invalid/expired authentication token!' });
    //             }
    //             else {
    //                 reject({ message: 'Something went wrong!!' });
    //             }
    //         })
    //     });
    // };

    paymentAddApiCall = (passData) => {
        return new Promise((resolve, reject) => {
            const request = axios({
                method: 'post',
                url: 'paymentAdd',
                data: passData
            })
            request.then((response) => {
                const { status, message, data } = response.data;
                if (status) {
                    resolve({ message, data });
                } else {
                    reject({ message });
                }
            }).catch((error) => {
                console.log('paymentAddApiCall error ' + error);
                if (error.response && error.response.status === 401) {
                    reject({ responseCode: error.response.status, message: 'Invalid/expired authentication token!' });
                }
                else {
                    reject({ message: 'Something went wrong!!' });
                }
            })
        });
    };
}

const instance = new paymentService();

export default instance;
