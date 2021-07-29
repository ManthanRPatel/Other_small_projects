import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import FuseUtils from '@fuse/utils';
import configAppConst from '../../appConfigurations'


const useStyles = makeStyles(theme => ({
    mainDiv: {
        border: '0.3px solid #E1DADA',
        borderRadius: '7px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    GridMain: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        // padding: theme.spacing(1),
        textAlign: 'left',
    },
    textGridMain: {
        padding: theme.spacing(2),
        textAlign: 'left',
        border: '0.3px solid #E1DADA',
        borderRadius: '7px',
    },
    modifyButtonStyle: {
        textTransform: 'none',
        marginTop: '1%',
        marginRight: '1%',
        // margin: '0.5%',
        boxShadow: '2px 2px 20px #F4F8FB',
    },
    buttonStyle: {
        textTransform: 'none',
        margin: '2%',
    },
    buttonStyle2: {
        textTransform: 'none',
        margin: '2%',
        boxShadow: '2px 2px 20px #F4F8FB',
    },
    GridLastButton: {
        margin: '20px',
        padding: '20px'
    },
    payButtonStyle: {
        textTransform: 'none',
        boxShadow: '2px 2px 20px #F4F8FB',
    },
    buttonProgress: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

function ReviewStepperComponent(props) {
    const { paymentAllData } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { addPaymentLoader } = useSelector(({ fuse }) => fuse.loader.paymentLoaders);
    const { cust_auth_token, paymentPayDetailArr, paymentSuccessData, customerData, updatedCustomerData } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
    const [finalPayAmount, setFinalPayAmount] = useState(0);
    const [surchargeAmount, setSurchargeAmount] = useState(0);
    const [finalsurchargePayAmount, setFinalSurchargePayAmount] = useState(0);

    useEffect(() => {
        if (paymentSuccessData) {
            props.handleNext();
        }
    }, [paymentSuccessData, props]);

    useEffect(() => {
        if (paymentPayDetailArr) {
            if (paymentPayDetailArr && (paymentPayDetailArr.length > 0)) {
                let amount = 0
                for (let i = 0; i < paymentPayDetailArr.length; i++) {
                    let paymentData = paymentPayDetailArr[i];
                    if (paymentData.select_payment_amount && paymentData.select_payment_amount !== '') {
                        amount = amount + Number(paymentData.select_payment_amount)
                    }
                }
                setFinalPayAmount(amount);

                let chargeAmount = 0
                if (amount !== '') {
                    let mainAmount = Number(Number(amount) * 4)
                    if (mainAmount !== 0) {
                        chargeAmount = Number(mainAmount / 100)
                    }
                }
                setSurchargeAmount(chargeAmount);

                let finalwithChargeAmount = Number(amount) + chargeAmount
                setFinalSurchargePayAmount(finalwithChargeAmount);
            }
            else {
                setFinalPayAmount(0);
                setSurchargeAmount(0);
                setFinalSurchargePayAmount(0);
            }
        }
    }, [paymentPayDetailArr]);

    function handleBackUpdateData() {
        if (updatedCustomerData && customerData && customerData.customer_data) {
            let finalCustData = {}
            finalCustData.contact_name = updatedCustomerData.contact_name
            finalCustData.contact_email = updatedCustomerData.contact_email
            finalCustData.contact_address = updatedCustomerData.contact_address
            finalCustData.contact_city = updatedCustomerData.contact_city
            finalCustData.contact_state = updatedCustomerData.contact_state
            finalCustData.contact_zip = updatedCustomerData.contact_zip
            finalCustData.customer_id = customerData.customer_data.customer_id
            finalCustData.customer_name = customerData.customer_data.customer_name

            finalCustData.cc_contact_name = updatedCustomerData.cc_contact_name
            finalCustData.cc_contact_email = updatedCustomerData.cc_contact_email
            finalCustData.cc_contact_address = updatedCustomerData.cc_contact_address
            finalCustData.cc_contact_city = updatedCustomerData.cc_contact_city
            finalCustData.cc_contact_state = updatedCustomerData.cc_contact_state
            finalCustData.cc_contact_zip = updatedCustomerData.cc_contact_zip

            finalCustData.card_number = updatedCustomerData.card_number
            finalCustData.expiry_date = updatedCustomerData.expiry_date
            finalCustData.cvv = updatedCustomerData.cvv
            finalCustData.from_call = 1
            dispatch(Actions.saveUpdatedCustomerData(finalCustData));
        }
        props.handleBack();
    }

    function handleAddPaymentSubmit() {
        if (paymentAllData && paymentAllData.customer_data && paymentPayDetailArr && (paymentPayDetailArr.length > 0)) {            
            let formdata = new FormData();
            formdata.append('auth_token', cust_auth_token);
            formdata.append('customer_id', paymentAllData.customer_data.customer_id);
            formdata.append('card_number', updatedCustomerData.card_number);
            formdata.append('expiry_date', updatedCustomerData.expiry_date);
            formdata.append('cvv', updatedCustomerData.cvv);

            //for update customer data
            formdata.append('contact_name', updatedCustomerData.contact_name);
            formdata.append('contact_email', updatedCustomerData.contact_email);
            formdata.append('contact_address', updatedCustomerData.contact_address);
            formdata.append('contact_city', updatedCustomerData.contact_city);
            formdata.append('contact_state', updatedCustomerData.contact_state);
            formdata.append('contact_zip', updatedCustomerData.contact_zip);

            //for update card customer data
            formdata.append('cc_contact_name', updatedCustomerData.cc_contact_name);
            formdata.append('cc_contact_email', updatedCustomerData.cc_contact_email);
            formdata.append('cc_contact_address', updatedCustomerData.cc_contact_address);
            formdata.append('cc_contact_city', updatedCustomerData.cc_contact_city);
            formdata.append('cc_contact_state', updatedCustomerData.cc_contact_state);
            formdata.append('cc_contact_zip', updatedCustomerData.cc_contact_zip);

            //for pay amount
            let newPaymentData = []
            for (let i = 0; i < paymentPayDetailArr.length; i++) {
                let paymentData = paymentPayDetailArr[i];
                let newPay = {}
                newPay.payment_id = paymentData.payment_id
                newPay.payment_for = paymentData.payment_for
                newPay.payment_amount = paymentData.select_payment_amount
                newPaymentData.push(newPay);
            }
            let finalArr = []
            if (newPaymentData.length > 0) {
                finalArr = JSON.stringify(newPaymentData)
            }
            formdata.append('payment_data', finalArr);
            dispatch(Actions.showLoader('ADD_PAYMENT_LOADER', true));
            dispatch(Actions.paymentAddApiCall(formdata));
        }
        else {
            dispatch(Actions.showMessage({ message: 'Something went wrong' }));
        }
    }

    return (
        <div className="flex flex-col w-full">
            <Grid container>
                <Grid item sm={12} xs={12}>
                    <Typography variant="h6" className="font-bold" gutterBottom >{configAppConst.reviewTitle}</Typography>
                </Grid>
                {/* <Grid item sm={2} xs={2} className="flex justify-end modifyButtonShow" >
                    <Button color="primary" size='small' className={classes.modifyButtonStyle} variant="contained"
                        onClick={() => { handleBackUpdateData() }}>
                        {configAppConst.modifyTitle}
                    </Button>
                </Grid> */}
            </Grid>
            <br />

            <div className="flex flex-col w-full">
                {/* <div className={classes.mainDiv}>
                    <div className="flex flex-end justify-end modifyButton">
                        <Button color="primary" size='small' className={classes.modifyButtonStyle} variant="contained"
                            onClick={() => { handleBackUpdateData() }}>
                            {configAppConst.modifyTitle}
                        </Button>
                    </div>

                    <Grid container className={classes.GridMain} alignItems='flex-end'>
                        <Grid item sm={4} xs={4}>
                            <Typography variant="subtitle1" gutterBottom >{configAppConst.invoiceNumberTitle}</Typography>
                            <Typography variant="subtitle1" gutterBottom >{configAppConst.amountTitle}</Typography>
                        </Grid>
                        <Grid item sm={8} xs={8}>
                            <Typography variant="subtitle1" gutterBottom >{paymentPayDetailArr.payment_number}</Typography>
                            <Typography variant="subtitle1" gutterBottom >{('$' + FuseUtils.currencyFormat(paymentPayDetailArr.select_payment_amount))}</Typography>
                        </Grid>
                    </Grid>
                </div> */}

                {(paymentPayDetailArr && paymentPayDetailArr.length > 0) &&
                    <div className="flex flex-col w-full">
                        {paymentPayDetailArr.map((dataObj, index) => (
                            <div key={index} className={classes.mainDiv}>
                                <Grid container className={classes.GridMain} alignItems='flex-end'>
                                    <Grid container>
                                        <Grid item sm={5} xs={5}>
                                            {(dataObj.payment_for !== 'invoice') ?
                                                <Typography variant="subtitle1" gutterBottom >{FuseUtils.capitalize(dataObj.payment_for) + ' ' + configAppConst.invoiceNumberTitle}</Typography>
                                                :
                                                <Typography variant="subtitle1" gutterBottom >{configAppConst.invoiceNumberTitle}</Typography>
                                            }
                                        </Grid>
                                        <Grid item sm={7} xs={7}>
                                            <Typography className="showTextRight" variant="subtitle1" gutterBottom >{dataObj.payment_number}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item sm={5} xs={5}>
                                            <Typography variant="subtitle1" gutterBottom >{configAppConst.amountTitle}</Typography>
                                        </Grid>
                                        <Grid item sm={7} xs={7}>
                                            <Typography className="showTextRight" variant="subtitle1" gutterBottom >{(dataObj.select_payment_amount && (dataObj.select_payment_amount !== '')) ? ('$' + FuseUtils.currencyFormat(dataObj.select_payment_amount)) : '$0'}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </div>
                }
                <br /><br /><br />

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.textGridMain}
                >
                    <Typography variant="h6" gutterBottom>
                        {(customerData.customer_data ? customerData.customer_data.customer_name : '') + ' ' + configAppConst.payCreditTitle + ' ' + updatedCustomerData.card_number_last + configAppConst.forTotalTitle} <b className="text-blue font-semibold" color="primary">{('$' + FuseUtils.currencyFormat(finalsurchargePayAmount))}</b>
                    </Typography>
                    {/* <Typography className="text-blue" color="primary" variant="h6" gutterBottom>
                            {('$' + FuseUtils.currencyFormat(finalPayAmount))}
                        </Typography> */}
                </Grid>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Typography className="font-bold text-red" variant="subtitle2" gutterBottom>{configAppConst.surchargeTitle + ('$' + FuseUtils.currencyFormat(surchargeAmount))}</Typography>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    // spacing={3}
                    className={classes.GridLastButton}
                >
                    <Button onClick={() => { handleBackUpdateData(); }} variant="outlined" size="large" color="primary" className={classes.buttonStyle} >
                        {configAppConst.backTitle}
                    </Button>
                    <div className="relative m-1">
                        <Button
                            className={classes.payButtonStyle}
                            variant="contained"
                            color={(addPaymentLoader === true) ? "inherit" : "primary"}
                            size="large"
                            disabled={(addPaymentLoader === true) ? true : false}
                            onClick={() => { handleAddPaymentSubmit() }}>{configAppConst.processPaymentTitle}</Button>
                        {addPaymentLoader &&
                            <CircularProgress size={24} className={classes.buttonProgress} />
                        }
                    </div>
                    {/* className={classes.buttonStyle2} */}
                </Grid>
            </div>
        </div>
    )
}

export default ReviewStepperComponent
