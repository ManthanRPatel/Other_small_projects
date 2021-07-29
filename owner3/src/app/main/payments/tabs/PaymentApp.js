import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button, CircularProgress } from '@material-ui/core';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import PaymentsComponent from './PaymentsComponent'
import configAppConst from '../../appConfigurations'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    layoutRoot: {
        backgroundColor: '#F4F8FB',
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

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function PaymentApp(props) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const { passwordLoader } = useSelector(({ fuse }) => fuse.loader.paymentLoaders);
    const { passwordSuccess, paymentData } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
    const [passwordText, setPasswordText] = useState('');
    const [passwordDialog, setPasswordDialog] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        if (props.match.params.paymentToken) {
            if (passwordSuccess === false) {
                setPasswordDialog(true);
            }
        }
        else {
            return (
                props.history.push('/pages/errors/error-404')
                // <Redirect to="/pages/errors/error-404" />
            );
        }
    }, [passwordSuccess, props.match.params.paymentToken]);

    useEffect(() => {
        if (paymentData) {
            if (paymentData.payment_data) {
                dispatch(Actions.assignPaymentListData(paymentData.payment_data));
            }
            setPasswordText('');
            setPasswordDialog(false);
        }
    }, [paymentData, dispatch]);

    const handleChange = name => event => {
        // let targetName = event.target.name;
        let targetValue = event.target.value;
        if (name === 'password') {
            setPasswordText(targetValue);
        }
    };

    function handleOnKeyUp(event) {
        if ((canBeSubmitted()) && (event.keyCode === 13)) {
            handleSubmit();
        }
    }

    function canBeSubmitted() {
        if (passwordText !== '') {
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit() {
        if (passwordText !== '') {
            let formdata = new FormData();
            formdata.append('password', passwordText);
            formdata.append('payment_token', props.match.params.paymentToken);
            dispatch(Actions.showLoader('PASSWORD_LOADER', true));
            dispatch(Actions.customerVerification(formdata));
        }
        else {
            dispatch(Actions.showMessage({ message: 'Password is required' }));
        }
    }

    return (
        <React.Fragment>
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={passwordDialog}
                // onClose={() => { setPasswordDialog(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{configAppConst.passwordTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{configAppConst.enterPasswordTitle}</DialogContentText>
                    <div>
                        <TextField
                            className="mb-16"
                            label="Password"
                            id={"password"}
                            name={"password"}
                            value={passwordText}
                            type="password"
                            variant="outlined"
                            onChange={handleChange('password')}
                            onKeyUp={handleOnKeyUp}
                            fullWidth
                            required
                            autoFocus={true}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <div className="relative m-1">
                        <Button
                            className="normal-case"
                            // autoFocus
                            variant="contained"
                            color={(passwordLoader === true) ? "inherit" : "primary"}
                            disabled={(passwordLoader === true) ? true : false}
                            onClick={() => { handleSubmit() }}>{configAppConst.submitTitle}</Button>
                        {passwordLoader &&
                            <CircularProgress size={24} className={classes.buttonProgress} />
                        }
                    </div>
                </DialogActions>
            </Dialog>

            <FusePageSimple
                // classes={{ root: classes.layoutRoot }}
                classes={{
                    contentWrapper: "p-0 sm:p-24 pb-80 sm:pb-80 h-full",
                    content: "flex h-full justify-center"
                }}
                content={
                    <div style={{ backgroundColor: '#F4F8FB', width: (width >= 1920) ? 1920 : '100%' }} className="p-24 h-full">
                        <PaymentsComponent paymentDataObj={paymentData} />
                    </div>
                }
            />
        </React.Fragment>
    )
}

export default withReducer('PaymentsApp', reducer)(PaymentApp);