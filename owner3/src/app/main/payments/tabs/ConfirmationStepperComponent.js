import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
// import FuseUtils from '@fuse/utils';
import configAppConst from '../../appConfigurations'

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        textTransform: 'none',
        boxShadow: '2px 2px 20px #F4F8FB',
    },
    IconStyle: {
        width: '75vw',
        height: '17vh',
        // margin: 20,
        marginBottom: '7vh',
        textAlign: 'center',
        display: 'inline-block',
    }
}));

function ConfirmationStepperComponent(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { paymentSuccessData } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
    const [paySuccessData, setPaySuccessData] = useState(null);

    useEffect(() => {
        if (paymentSuccessData) {
            // if (paymentSuccessData.payment_data) {
            //     // setPaySuccessData(paymentSuccessData.payment_data);
            //     let finalData = paymentSuccessData.payment_data
            //     if (finalData && (finalData.length > 0)) {
            //         let newArr = []
            //         for (let i = 0; i < finalData.length; i++) {
            //             let payObj = finalData[i];
            //             newArr.push(payObj.payment_number);
            //         }
            //         let newIdsStr = newArr.join(', ')
            //         setPaySuccessData(newIdsStr);
            //     }
            // }

            if (paymentSuccessData.transaction_id) {
                setPaySuccessData(paymentSuccessData.transaction_id);
            }
        }
    }, [paymentSuccessData]);

    return (
        <React.Fragment>
            <Grid container className="mt-0"
                direction="row"
                justify="center"
                alignItems="center">
                <CheckCircleRoundedIcon color="primary" className={classes.IconStyle} />
            </Grid>


            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Typography variant="h5" className="font-bold text-center" color='primary' gutterBottom >{configAppConst.paymentSuccessTitle}</Typography>
            </Grid>

            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Typography variant="subtitle1" gutterBottom >{configAppConst.thanksTitle}</Typography>
                {/* <Typography variant="subtitle1" gutterBottom >{configAppConst.invoiceNumberTitle + ' : '} <b className="text-blue font-semibold" color="primary">{paySuccessData ? paySuccessData : ''}</b></Typography> */}
                {/* <Typography color="primary" variant="subtitle2" gutterBottom >{paySuccessData.payment_number}</Typography> */}
            </Grid>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Typography variant="subtitle1" gutterBottom >{configAppConst.confirmNoTitle + ' : '} <b className="text-blue font-semibold" color="primary">{paySuccessData ? paySuccessData : ''}</b></Typography>
            </Grid>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Typography variant="subtitle1" gutterBottom >{configAppConst.businessTitle}</Typography>
            </Grid>

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className=" pt-36 "
            >
                <Button onClick={() => {
                    window.location.replace('https://theregencygroup.net/');
                    
                    // dispatch(Actions.resetAddPaymentData());
                    // dispatch(Actions.setPayPaymentObjectArrPosition(-1));
                    // dispatch(Actions.setPayPaymentObjectArr(null));
                    // dispatch(Actions.resetCustomerData(null));
                    // dispatch(Actions.saveUpdatedCustomerData(null));
                    // dispatch(Actions.changeCCCustomerDataDetails(true));
                    // props.handleReset();
                }} variant="contained" size="large" className={classes.buttonStyle} color="primary" autoFocus>
                    {configAppConst.doneTitle}
                </Button>

            </Grid>
        </React.Fragment>
    )
}

export default ConfirmationStepperComponent