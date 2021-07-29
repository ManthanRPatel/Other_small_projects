import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Paper, Grid } from '@material-ui/core';
import BillStepperComponent from './BillStepperComponent'
import ReviewStepperComponent from './ReviewStepperComponent'
import PaymentInfoStepperComponent from './PaymentInfoStepperComponent'
import ConfirmationStepperComponent from './ConfirmationStepperComponent'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  StepperTabMain: {
    padding: '20px',
    border: '0px solid blue',
    borderRadius: '30px'
  },
  stepperMain: {
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    backgroundColor: '#F4F8FB',
    // color:'#006CFF',
    // fontSize:'500px'
  },
  stepperFont: {
    color: '#F4F8FB',
    fontSize: '500px'
  }
}));


export default function PaymentsComponent(props) {
  const { paymentDataObj } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { cust_auth_token, allDataClear, showAllInvoice } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const paymentRef = useRef(null);

  useEffect(() => {
    if (allDataClear) {
      dispatch(Actions.allAppDataClear(false));
      setActiveStep(0);
    }
  }, [allDataClear, dispatch]);

  useEffect(() => {
    if (!showAllInvoice) {
      scrollToRef(paymentRef);
    }
  }, [showAllInvoice, dispatch]);

  function scrollToRef(ref) {
    if (ref && ref.current) {
      ref.current.scrollIntoView();
    }
  }

  function getSteps() {
    return ['Invoices', 'Payment Info', 'Review'];
  }

  const handleNext = () => {
    scrollToRef(paymentRef);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    scrollToRef(paymentRef);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleReset = () => {
    scrollToRef(paymentRef);
    if (paymentDataObj && paymentDataObj.customer_data) {
      if (!showAllInvoice) {
        dispatch(Actions.changeInvoiceFullView(true));
      }
      dispatch(Actions.showLoader('PROGRESS_LOADER', true));
      dispatch(Actions.getPaymentList(cust_auth_token, paymentDataObj.customer_data.customer_id, 1, paymentDataObj.payment_for, ''));
    }
    setActiveStep(0);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <BillStepperComponent activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} paymentAllData={paymentDataObj} />;
      case 1:
        return <PaymentInfoStepperComponent handleBack={handleBack} handleNext={handleNext} paymentAllData={paymentDataObj} />;
      case 2:
        return <ReviewStepperComponent handleBack={handleBack} handleNext={handleNext} paymentAllData={paymentDataObj} />;
      case 3:
        return <ConfirmationStepperComponent handleReset={handleReset} handleBack={handleBack} handleNext={handleNext} paymentAllData={paymentDataObj} />;
      default:
        return 'Unknown step';
    }
  }


  return ((paymentDataObj) ?
    (<div ref={paymentRef} className={classes.root}>

      <Stepper style={{ backgroundColor: '#F4F8FB' }} className={classes.stepperMain, "mx-2 xs:mx-2 sm:mx-2 md:mx-32 lg:mx-256 xl:mx-320"} activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step className={classes.stepperFont} key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="flex flex-col w-full">
        <Paper className="mx-4 p-4 xs:mx-4 sm:mx-4 md:mx-64 lg:mx-320 xl:mx-512 xs:p-4 sm:p-4 md:p-12 lg:p-24 xl:p-24" elevation={0}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            // style={{ minHeight: '80vh' }}
            className={classes.StepperTabMain}
          >
            {getStepContent(activeStep)}
          </Grid>
        </Paper>
      </div>
    </div>) : null
  );
}
