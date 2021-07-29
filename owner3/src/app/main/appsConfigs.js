import { PaymentAppConfig } from './payments/PaymentAppConfig';
import axios from 'axios';

// export const serverBaseURL = 'http://digitattva.in/regency_payment/admin/Api/CustomerWebService/';

export const serverBaseURL = 'https://payments-api.theregencygroup.net/admin/Api/CustomerWebService/';

axios.defaults.baseURL = serverBaseURL;

const appsConfigs = [
    PaymentAppConfig,
];

export default appsConfigs;