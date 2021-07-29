import React, { useEffect, useState, useRef } from 'react'
import { Button, Grid, Typography, TextField, CircularProgress } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Formsy from 'formsy-react';
import FuseUtils from '@fuse/utils';
import * as Actions from '../store/actions';
import TableComponent from './TableComponent'
import configAppConst from '../../appConfigurations'
import NumberFormat from 'react-number-format';
import { serverBaseURL } from '../../appsConfigs';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        zIndex: 100,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    dialogPaper: {
        minHeight: '40vh',
        maxHeight: '80vh',
        minWidth: '60vh',
        maxWidth: '80vh',
    },
    buttonStyle: {
        textTransform: 'none',
        boxShadow: '2px 2px 20px #F4F8FB',
    },
    radioButtonStyle: {
        marginRight: '0px',
        padding: '8px',
    },
    buttonProgress: {
        color: theme.palette.text.primary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
        // textTransform: 'none',
        // boxShadow: '2px 2px 20px #F4F8FB',
    },
}));

function BillStepperComponent(props) {
    const { paymentAllData } = props
    const dispatch = useDispatch();
    const classes = useStyles();

    const { partialAmountLoader } = useSelector(({ fuse }) => fuse.loader.paymentLoaders);
    const { cust_auth_token, cust_account_balance, paymentPayDetailPosition, paymentPayDetailArr, paymentList, customerData, showAllInvoice, ChangeInvoiceAmount, clearPaymentPayPosition, viewAllPaymentData, payAllPaymentData } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
    const [custBalAmount, setCustBalAmount] = useState(0);
    const [amountAltValue, setAmountAltValue] = useState('fullAmount');
    const [partialAmount, setPartialAmount] = useState('')
    const [changePartial, setChangePartial] = useState(false);
    const [currenBalPayment, setCurrenBalPayment] = useState(0);
    const [finalPayAmount, setFinalPayAmount] = useState(0);
    const [finalSelectedPayment, setFinalSelectedPayment] = useState(null)
    const [dialogStatus, setDialogStatus] = useState(false)
    const [viewPaymentData, setViewPaymentData] = useState(null)
    const [viewDialogStatus, setViewDialogStatus] = useState(false)
    const formRef = useRef(null);

    useEffect(() => {
        if (paymentPayDetailArr) {
            setChangePartial(false);
            if ((paymentPayDetailPosition !== -1) && (paymentPayDetailPosition !== 'check_selected_payment')) {
                let newArr = []
                if (paymentPayDetailArr && paymentPayDetailArr.length > 0) {
                    newArr = [...paymentPayDetailArr]
                    for (let i = 0; i < paymentPayDetailArr.length; i++) {
                        let paymentData = paymentPayDetailArr[i];
                        if (paymentData.payment_id === paymentPayDetailPosition) {
                            if ((paymentData.balance_amount !== '') && (Number(paymentData.balance_amount) > 0)) {
                                paymentData.select_payment_amount = Number(paymentData.balance_amount);
                                paymentData.select_payment_value = amountAltValue;
                            }
                            newArr[i] = paymentData
                            break
                        }
                    }
                }
                setFinalSelectedPayment(newArr);
                calculatePayAmount(newArr);

                //for update payment list
                let newPaymentList = []
                if (paymentList && paymentList.length > 0) {
                    newPaymentList = [...paymentList];
                    for (let i = 0; i < paymentList.length; i++) {
                        let paymentData = paymentList[i];
                        if (paymentData.payment_id === paymentPayDetailPosition) {
                            paymentData.select_payment_amount = Number(paymentData.balance_amount);
                            newPaymentList[i] = paymentData
                            break
                        }
                    }
                    dispatch(Actions.assignPaymentListData(newPaymentList));
                }
                dispatch(Actions.setPayPaymentObjectArrPosition(-1));
                // let newArr = []
                // if (paymentPayDetailArr && paymentPayDetailArr.length > 0) {
                //     newArr = [...paymentPayDetailArr]
                //     for (let i = 0; i < paymentPayDetailArr.length; i++) {
                //         let paymentData = paymentPayDetailArr[i];
                //         if (paymentData.payment_id === paymentPayDetailPosition) {
                //             setCurrenBalPayment(paymentData.balance_amount);
                //             if (paymentData.select_payment_value && paymentData.select_payment_value !== '') {
                //                 setAmountAltValue(paymentData.select_payment_value);
                //             }
                //             if (paymentData.select_payment_amount && paymentData.select_payment_amount !== '') {
                //                 setPartialAmount(paymentData.select_payment_amount);
                //             }
                //             else {
                //                 setPartialAmount('');
                //             }
                //             break
                //         }
                //     }
                // }
                // setFinalSelectedPayment(newArr);
                // setChangePartial(true);
                // setDialogStatus(true);
                // calculatePayAmount(newArr);
            }
            else if (paymentPayDetailPosition === 'check_selected_payment') {
                let newArr = []
                if (paymentPayDetailArr && paymentPayDetailArr.length > 0) {
                    newArr = [...paymentPayDetailArr]
                    setFinalSelectedPayment(newArr);
                    calculatePayAmount(newArr);
                }
                setAmountAltValue('fullAmount');
                setCurrenBalPayment(0);
                setPartialAmount('');
                setDialogStatus(false);
            }
            else {
                setAmountAltValue('fullAmount');
                setCurrenBalPayment(0);
                setPartialAmount('');
                setDialogStatus(false);
            }
        }
        else {
            if (paymentPayDetailPosition === -1) {
                setAmountAltValue('fullAmount');
                setCurrenBalPayment(0);
                setPartialAmount('');
                setFinalPayAmount(0);
                setFinalSelectedPayment(null);
            }
        }
    }, [paymentPayDetailArr, paymentPayDetailPosition]);

    useEffect(() => {
        if ((ChangeInvoiceAmount === 'full_payment_list') && showAllInvoice && paymentList) {
            let newPaymentList = []
            if (paymentList && paymentList.length > 0) {
                newPaymentList = [...paymentList];
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    if (finalSelectedPayment && finalSelectedPayment.length > 0) {
                        for (let j = 0; j < finalSelectedPayment.length; j++) {
                            let finalPayData = finalSelectedPayment[j];
                            if (paymentData.payment_id === finalPayData.payment_id) {
                                paymentData.select_payment_amount = Number(finalPayData.select_payment_amount);
                                paymentData.select_payment_value = Number(finalPayData.select_payment_value);
                                newPaymentList[i] = paymentData
                            }
                        }
                    }
                }
                dispatch(Actions.changeInvoicePaymentAmount(''));
                dispatch(Actions.assignPaymentListData(newPaymentList));
            }
        }
        else if ((ChangeInvoiceAmount === 'less_payment_list') && (!showAllInvoice) && paymentList) {
            let newPaymentList = []
            let newBalAmount = 0
            if (paymentList && paymentList.length > 0) {
                newPaymentList = [...paymentList];
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    paymentData.select_payment_amount = Number(0);
                    paymentData.select_payment_value = 'fullAmount';
                    newPaymentList[i] = paymentData
                    if (i === 0) {
                        newBalAmount = Number(paymentData.balance_amount)
                    }
                }
                dispatch(Actions.changeInvoicePaymentAmount(''));
                dispatch(Actions.assignPaymentListData(newPaymentList));
                setCustBalAmount(newBalAmount);
            }
        }
        else {
            let newBalAmount = 0
            if (paymentList && paymentList.length > 0) {
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    if (i === 0) {
                        newBalAmount = Number(paymentData.balance_amount)
                        break
                    }
                }
            }
            setCustBalAmount(newBalAmount);
        }
    }, [showAllInvoice, ChangeInvoiceAmount, paymentList, dispatch]);

    useEffect(() => {
        if (viewAllPaymentData) {
            dispatch(Actions.setViewAllPaymentListData(false));
            if (paymentList && paymentList.length > 0) {
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    if (paymentData.payment_token) {
                        window.open(serverBaseURL + 'pdfDisplay?payment_token=' + paymentData.payment_token, '', '');
                    }
                    // window.open('/view_invoice/' + cust_auth_token + '/' + paymentData.payment_id + '/' + paymentData.payment_for, '', '');
                }
            }
        }
    }, [viewAllPaymentData, paymentList, dispatch]);

    useEffect(() => {
        if (payAllPaymentData) {
            dispatch(Actions.setPayAllPaymentListData(false));

            let newPaymentList = []
            if (paymentList && paymentList.length > 0) {
                newPaymentList = [...paymentList];
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    if ((paymentData.balance_amount !== '') && (Number(paymentData.balance_amount) > 0)) {
                        paymentData.select_payment_amount = Number(paymentData.balance_amount);
                        paymentData.select_payment_value = amountAltValue;
                    }
                    newPaymentList[i] = paymentData
                }
            }
            dispatch(Actions.assignPaymentListData(newPaymentList));
            setFinalSelectedPayment(newPaymentList);
            calculatePayAmount(newPaymentList);
        }
    }, [payAllPaymentData, paymentList, dispatch]);

    useEffect(() => {
        if (clearPaymentPayPosition !== -1) {
            let newPaymentList = []
            if (paymentList && paymentList.length > 0) {
                newPaymentList = [...paymentList];
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    if (clearPaymentPayPosition === paymentData.payment_id) {
                        paymentData.select_payment_amount = Number(0);
                        paymentData.select_payment_value = 'fullAmount';
                        newPaymentList[i] = paymentData
                        break
                    }
                }
            }

            let newArr = []
            if (finalSelectedPayment && finalSelectedPayment.length > 0) {
                for (let i = 0; i < finalSelectedPayment.length; i++) {
                    let paymentData = finalSelectedPayment[i];
                    if (paymentData.payment_id !== paymentPayDetailPosition) {
                        newArr.push(paymentData)
                    }
                }
            }
            dispatch(Actions.setClearPayPaymentObjectArrPosition(-1));
            dispatch(Actions.assignPaymentListData(newPaymentList));
            setFinalSelectedPayment(newArr);
            calculatePayAmount(newArr);
        }
    }, [clearPaymentPayPosition, paymentList, dispatch]);

    function calculatePayAmount(payArr) {
        let amount = 0
        if (payArr && payArr.length > 0) {
            for (let i = 0; i < payArr.length; i++) {
                let paymentData = payArr[i];
                if (paymentData.select_payment_amount && paymentData.select_payment_amount !== '') {
                    amount = amount + Number(paymentData.select_payment_amount)
                }
            }
        }
        setFinalPayAmount(amount);
    }

    useEffect(() => {
        if (customerData) {
            setDialogStatus(false);
            props.handleNext();
        }
    }, [customerData, props]);

    const handleChangeRadio = event => {
        let targetValue = event.target.value;
        if (targetValue === 'fullAmount') {
            setPartialAmount('');
        }
        else {
            setPartialAmount(currenBalPayment);
        }
        setAmountAltValue(targetValue);
    };

    function handleOnKeyUp(event) {
        if (event.keyCode === 13) {
            handleSelectAmountDialog();
        }
    }

    const handleChangeNumberText = (name, targetName, formattedValue, targetValue) => {
        if (name === 'amount') {
            if (finalSelectedPayment && (finalSelectedPayment.length > 0)) {
                let balance_amount = Number(currenBalPayment)
                if ((Number(targetValue) >= 0) && Number(targetValue) <= balance_amount) {
                    setChangePartial(!changePartial);
                    setPartialAmount(targetValue);
                }
                else {
                    setChangePartial(!changePartial);
                    setPartialAmount(partialAmount);
                }
            }
            else {
                setChangePartial(!changePartial);
            }
        }
    }

    function handleSelectAmountDialog() {
        let msg = ''
        let finalAmount = 0
        if (amountAltValue !== '') {
            if (amountAltValue === 'fullAmount') {
                finalAmount = currenBalPayment
            }
            else {
                if (partialAmount !== '') {
                    let balance_amount = Number(currenBalPayment)
                    if (Number(partialAmount) <= balance_amount) {
                        finalAmount = partialAmount
                    }
                    else {
                        msg = msg + 'Partial amount is smaller than full amount';
                    }
                }
                else {
                    msg = msg + 'Partial amount is required';
                }
            }
        }
        else {
            msg = msg + 'Amount is required';
        }

        if (msg.length > 0) {
            dispatch(Actions.showMessage({ message: msg }));
        } else {
            let newArr = []
            if ((paymentPayDetailPosition !== -1) && (finalSelectedPayment && finalSelectedPayment.length > 0)) {
                newArr = [...finalSelectedPayment];
                for (let i = 0; i < finalSelectedPayment.length; i++) {
                    let paymentData = finalSelectedPayment[i];
                    if (paymentData.payment_id === paymentPayDetailPosition) {
                        paymentData.select_payment_amount = Number(finalAmount);
                        paymentData.select_payment_value = amountAltValue;
                        newArr[i] = paymentData
                        break
                    }
                }
            }
            setFinalSelectedPayment(newArr);
            calculatePayAmount(newArr);

            //for update payment list
            let newPaymentList = []
            if (paymentList && paymentList.length > 0) {
                newPaymentList = [...paymentList];
                for (let i = 0; i < paymentList.length; i++) {
                    let paymentData = paymentList[i];
                    if (paymentData.payment_id === paymentPayDetailPosition) {
                        paymentData.select_payment_amount = Number(finalAmount);
                        newPaymentList[i] = paymentData
                        break
                    }
                }
                dispatch(Actions.assignPaymentListData(newPaymentList));
            }

            setDialogStatus(false);
            dispatch(Actions.setPayPaymentObjectArrPosition(-1));
        }
    }

    function handleSelectAmountSubmit() {
        if (finalPayAmount > 0) {
            if (finalSelectedPayment && finalSelectedPayment.length > 0) {
                if (paymentAllData && paymentAllData.customer_data) {
                    let newSelPaymentData = []
                    let newPaymentData = []
                    for (let i = 0; i < finalSelectedPayment.length; i++) {
                        let paymentData = finalSelectedPayment[i];
                        if (paymentData.select_payment_amount && (paymentData.select_payment_amount !== '') && (Number(paymentData.select_payment_amount) > 0)) {
                            let newPay = {}
                            newPay.payment_id = paymentData.payment_id
                            newPay.payment_for = paymentData.payment_for
                            newPay.payment_amount = paymentData.balance_amount
                            newPaymentData.push(newPay);
                            newSelPaymentData.push(paymentData);
                        }
                    }

                    let finalArr = []
                    if (newPaymentData.length > 0) {
                        finalArr = JSON.stringify(newPaymentData)

                        let formdata = new FormData();
                        formdata.append('auth_token', cust_auth_token);
                        formdata.append('customer_id', paymentAllData.customer_data.customer_id);
                        formdata.append('start', 1);
                        formdata.append('payment_data', finalArr);
                        dispatch(Actions.showLoader('PARTIAL_AMOUNT_LOADER', true));
                        dispatch(Actions.getCustomerPaymentInformation(formdata));

                        if (newSelPaymentData && newSelPaymentData.length > 0) {
                            dispatch(Actions.setPayPaymentObjectArrPosition(-1));
                            dispatch(Actions.setPayPaymentObjectArr(newSelPaymentData));
                        }
                    }
                    else {
                        dispatch(Actions.showMessage({ message: configAppConst.selectPaymentETitle }));
                    }
                }
            }
            else {
                dispatch(Actions.showMessage({ message: configAppConst.selectPaymentETitle }));
            }
        }
        else {
            dispatch(Actions.showMessage({ message: configAppConst.selectPaymentETitle }));
        }
    }

    return ((paymentAllData) ?
        (<React.Fragment>
            {finalSelectedPayment && (finalSelectedPayment.length > 0) &&
                <Dialog
                    fullWidth={true}
                    maxWidth='xs'
                    // classes={{ paper: classes.dialogPaper }}
                    className="px-12 py-12"
                    open={dialogStatus}
                    onClose={() => {
                        dispatch(Actions.setPayPaymentObjectArrPosition(-1));
                        setDialogStatus(false)
                    }}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent className="p-24" >
                        <Typography className="text-xl font-bold text-center" variant="subtitle1" gutterBottom>{configAppConst.chooseAmountTitle}</Typography>
                        <br />
                        <Formsy ref={formRef}>
                            <Grid className={classes.radioButtonStyle} container alignItems='flex-start' spacing={2}>
                                <Grid item sm={6} xs={6}>
                                    <RadioGroup aria-label="Amount" name="Amount" value={amountAltValue} onChange={handleChangeRadio}>
                                        <FormControlLabel value="fullAmount" variant="h6" control={<Radio color="primary" />}
                                            label={configAppConst.fullAmountTitle} />
                                        <br />
                                        <FormControlLabel value="partialAmount" className="text-lg" control={<Radio color="primary" />}
                                            label={configAppConst.partialAmountTitle} />
                                    </RadioGroup>
                                </Grid>

                                <Grid item sm={6} xs={6}>
                                    <Typography className="pt-4 font-bold text-lg " gutterBottom >
                                        {('$' + FuseUtils.currencyFormat(currenBalPayment))}
                                    </Typography>
                                    <br />
                                    <div>
                                        <NumberFormat
                                            customInput={TextField}
                                            thousandSeparator={true} prefix={'$'} decimalScale={2}
                                            className="w-full"
                                            type="text"
                                            label="Enter Amount"
                                            id={"amount"}
                                            name={"amount"}
                                            value={changePartial ? partialAmount : partialAmount}
                                            variant="outlined"
                                            onKeyUp={handleOnKeyUp}
                                            disabled={(amountAltValue === 'fullAmount') ? true : false}
                                            onValueChange={(values) => {
                                                const { formattedValue, value } = values;
                                                setChangePartial(!changePartial);
                                                handleChangeNumberText('amount', 'amount', formattedValue, value);
                                            }} />
                                    </div>
                                </Grid>
                            </Grid>

                            <DialogActions>
                                <div className="flex justify-center mt-32">
                                    <div className="relative m-1">
                                        <Button
                                            className={classes.buttonStyle}
                                            autoFocus
                                            variant="contained"
                                            color={(partialAmountLoader === true) ? "inherit" : "primary"}
                                            size="large"
                                            disabled={(partialAmountLoader === true) ? true : false}
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                                if (dialogStatus === true) {
                                                    handleSelectAmountDialog();
                                                }
                                            }}>{configAppConst.submitTitle}</Button>
                                        {partialAmountLoader &&
                                            <CircularProgress size={24} className={classes.buttonProgress} />
                                        }
                                    </div>
                                </div>
                            </DialogActions>
                        </Formsy>
                    </DialogContent>
                </Dialog>
            }

            {viewPaymentData &&
                <Dialog
                    fullWidth={true}
                    maxWidth='xs'
                    // classes={{ paper: classes.dialogPaper }}
                    className="px-12 py-12"
                    open={viewDialogStatus}
                    onClose={() => {
                        setViewPaymentData(false);
                        setViewDialogStatus(false);
                    }}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogContent className="p-24" >
                        <Typography className="text-xl font-bold text-center" variant="subtitle1" gutterBottom>{configAppConst.paymentInfoTitle}</Typography>

                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{configAppConst.invoiceTitle + ' :'}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{viewPaymentData.payment_number}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{configAppConst.paymentforTitle + ' :'}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{viewPaymentData.payment_for}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{configAppConst.dateTitle + ' :'}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{viewPaymentData.payment_date}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{configAppConst.amountTitle + ' :'}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{('$' + FuseUtils.currencyFormat(viewPaymentData.payment_amount))}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{configAppConst.balanceTitle + ' :'}</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <Typography variant="subtitle1" gutterBottom >{('$' + FuseUtils.currencyFormat(viewPaymentData.balance_amount))}</Typography>
                            </Grid>
                        </Grid>

                        <DialogActions>
                            <div className="flex w-full justify-center mt-32">
                                <Button
                                    className={classes.buttonStyle}
                                    autoFocus
                                    variant="contained"
                                    color={"primary"}
                                    size="large"
                                    onClick={() => {
                                        setViewPaymentData(false);
                                        setViewDialogStatus(false);
                                    }}>{configAppConst.closeTitle}</Button>
                            </div>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            }

            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <Grid container>
                        <Grid item xs={6} sm={6} md={12} xl={12}>
                            <Typography variant="subtitle1" gutterBottom>{configAppConst.custNameTitle}</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={12} xl={12}>
                            <Typography className="text-base font-bold showTextRight" variant="subtitle1" color="inherit">
                                {paymentAllData.customer_data ? paymentAllData.customer_data.customer_name : ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <TableComponent paymentAllData={paymentAllData}
                onChangeViewData={(value) => {
                    // setViewPaymentData(value);
                    // setViewDialogStatus(true);
                    // window.open('/view_invoice/' + cust_auth_token + '/' + value.payment_id + '/' + value.payment_for, '', '');
                    if (value.payment_token) {
                        window.open(serverBaseURL + 'pdfDisplay?payment_token=' + value.payment_token, '', '');
                    }
                }}
            />

            <Grid container direction="row" justify="flex-end" alignItems="center" spacing={1}>
                <Grid item xs={12} sm={12} md={8} xl={9}>
                    <Grid container>
                        <Grid item xs={6} sm={6} md={12} xl={12}>
                            <div className="showTextRightView">
                                <Typography className="text-base font-bold" variant="subtitle1" gutterBottom>{configAppConst.accBalanceTitle}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={12} xl={12}>
                            <div className="showTextRightView">
                                <Typography className="text-base showTextRight" variant="subtitle1" color="inherit">
                                    {((cust_account_balance) ? ('$' + FuseUtils.currencyFormat(cust_account_balance)) : '$0.00')}
                                    {/* {(showAllInvoice) ?
                                        ((paymentAllData.customer_data) ? ('$' + FuseUtils.currencyFormat(paymentAllData.customer_data.balance_amount)) : '$0.00') :
                                        ('$' + FuseUtils.currencyFormat(custBalAmount))
                                    } */}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4} xl={3}>
                    <Grid container>
                        <Grid item xs={6} sm={6} md={12} xl={12}>
                            <div className="showTextRightView">
                                <Typography className="text-base font-bold" variant="subtitle1" gutterBottom>{configAppConst.paymentAmountTitle}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={12} xl={12}>
                            {((finalPayAmount !== 0)) &&
                                <div className="showTextRightView">
                                    <Typography className="text-base showTextRight" variant="subtitle1" color="inherit">
                                        {('$' + FuseUtils.currencyFormat(finalPayAmount))}
                                    </Typography>
                                </div>
                            }

                            {((finalPayAmount === 0)) &&
                                <div className="showTextRightView">
                                    <Typography className="text-base showTextRight" variant="subtitle1" color="inherit">
                                        {paymentAllData.customer_data ? ('$' + FuseUtils.currencyFormat(paymentAllData.customer_data.payment_amount)) : '$0.00'}
                                    </Typography>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} xl={12}>
                    <Typography className="font-bold text-red text-right" variant="subtitle2" gutterBottom>{configAppConst.chargeTitle}</Typography>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <div className="flex justify-center mt-32">
                    <div className="relative m-1">
                        <Button
                            className={classes.buttonStyle}
                            variant="contained"
                            color={(partialAmountLoader === true) ? "inherit" : "primary"}
                            size="large"
                            disabled={(partialAmountLoader === true) ? true : false}
                            onClick={() => { handleSelectAmountSubmit() }}>{configAppConst.continueTitle}</Button>
                        {partialAmountLoader &&
                            <CircularProgress size={24} className={classes.buttonProgress} />
                        }
                    </div>
                </div>
            </Grid>
        </React.Fragment>) : null
    )
}

export default BillStepperComponent
