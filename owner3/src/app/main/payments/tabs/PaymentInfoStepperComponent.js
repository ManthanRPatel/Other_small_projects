import React, { useEffect, useState, useRef } from 'react'
import Formsy from 'formsy-react';
import { addValidationRule } from 'formsy-react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import MaskedInput from 'react-maskedinput'
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import configAppConst from '../../appConfigurations'
import _ from '@lodash';

const useStyles = makeStyles(theme => ({
    buttonStyle: {
        textTransform: 'none',
        margin: '2%',
    },
    sameInfoButtonStyle: {
        textTransform: 'none',
        margin: '0.5%',
        marginLeft: '2%',
        boxShadow: '2px 2px 20px #F4F8FB',
    },
    buttonStyle2: {
        textTransform: 'none',
        margin: '2%',
        boxShadow: '2px 2px 20px #F4F8FB',
    }
}));

function PaymentInfoStepperComponent(props) {
    // const { paymentAllData } = props
    const dispatch = useDispatch();
    const classes = useStyles();
    const { customerData, updatedCustomerData, changeCCCustomerData } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
    const [newCustomerData, setNewCustomerData] = useState(null);
    // const [saveCustomerData, setSaveCustomerData] = useState(null);
    const [modifyCustomerData, setModifyCustomerData] = useState(null);
    // const [isModifyCustomerData, setIsModifyCustomerData] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvvText, setCvvText] = useState('');
    const formRef = useRef(null);
    var MONTH = new Date().getMonth() + 1
    // var YEAR = new Date().getFullYear()
    var YEAR = new Date().getFullYear() + ""
    YEAR = YEAR.match(/\d{2}$/)

    //for validation text
    const [isContactNameError, setIsContactNameError] = useState('');
    const [isContactEmailError, setIsContactEmailError] = useState('');
    const [isContactAddressError, setIsContactAddressError] = useState('');
    const [isContactCityError, setIsContactCityError] = useState('');
    const [isContactStateError, setIsContactStateError] = useState('');
    const [isContactZipError, setIsContactZipError] = useState('');
    const [isCCContactNameError, setIsCCContactNameError] = useState('');
    const [isccContactEmailError, setIsCCContactEmailError] = useState('');
    const [isCCContactAddressError, setIsCCContactAddressError] = useState('');
    const [isCCContactCityError, setIsCCContactCityError] = useState('');
    const [isCCContactStateError, setIsCCContactStateError] = useState('');
    const [isCCContactZipError, setIsCCContactZipError] = useState('');
    const [isCardNumError, setIsCardNumError] = useState('');
    const [isExpDateError, setIsExpDateError] = useState('');
    const [isCVVError, setIsCVVError] = useState('');



    useEffect(() => {
        if (customerData) {
            setNewCustomerData(customerData.customer_data);

            let finalCustData = {}
            finalCustData.cc_contact_name = customerData.customer_data.contact_name
            finalCustData.cc_contact_email = customerData.customer_data.contact_email
            finalCustData.cc_contact_address = customerData.customer_data.contact_address
            finalCustData.cc_contact_city = customerData.customer_data.contact_city
            finalCustData.cc_contact_state = customerData.customer_data.contact_state
            finalCustData.cc_contact_zip = customerData.customer_data.contact_zip
            finalCustData.customer_id = customerData.customer_data.customer_id
            finalCustData.customer_name = customerData.customer_data.customer_name
            setModifyCustomerData(finalCustData);
            // setSaveCustomerData(finalCustData);
        }
    }, [customerData]);

    useEffect(() => {
        if (updatedCustomerData) {
            if (updatedCustomerData.from_call === 1) {
                let newCustData = {}
                newCustData.contact_name = updatedCustomerData.contact_name
                newCustData.contact_email = updatedCustomerData.contact_email
                newCustData.contact_address = updatedCustomerData.contact_address
                newCustData.contact_city = updatedCustomerData.contact_city
                newCustData.contact_state = updatedCustomerData.contact_state
                newCustData.contact_zip = updatedCustomerData.contact_zip
                newCustData.customer_id = updatedCustomerData.customer_id
                newCustData.customer_name = updatedCustomerData.customer_name
                setNewCustomerData(newCustData);

                let finalCustData = {}
                finalCustData.cc_contact_name = updatedCustomerData.cc_contact_name
                finalCustData.cc_contact_email = updatedCustomerData.cc_contact_email
                finalCustData.cc_contact_address = updatedCustomerData.cc_contact_address
                finalCustData.cc_contact_city = updatedCustomerData.cc_contact_city
                finalCustData.cc_contact_state = updatedCustomerData.cc_contact_state
                finalCustData.cc_contact_zip = updatedCustomerData.cc_contact_zip
                finalCustData.customer_id = updatedCustomerData.customer_id
                finalCustData.customer_name = updatedCustomerData.customer_name
                setModifyCustomerData(finalCustData);
                // setSaveCustomerData(finalCustData);

                setCardNumber(updatedCustomerData.card_number);
                if (updatedCustomerData.expiry_date && updatedCustomerData.expiry_date.length >= 4) {
                    let newExpDate = updatedCustomerData.expiry_date
                    let expStart = newExpDate.substring(0, 2);
                    let expEnd = newExpDate.slice(-2);
                    setExpDate(expStart + '/' + expEnd);
                }
                setCvvText(updatedCustomerData.cvv);
            }
        }
    }, [updatedCustomerData]);

    const handleChangeText = name => event => {
        // let targetName = event.target.name;
        let targetValue = event.target.value;

        if (name === 'contact_name') {
            if (newCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                mainCustomerData.contact_name = targetValue
                setNewCustomerData(mainCustomerData)

                // if (changeCCCustomerData) {
                //     if (modifyCustomerData) {
                //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                //         mainCCCustomerData.cc_contact_name = targetValue
                //         setModifyCustomerData(mainCCCustomerData)
                //     }
                // }
            }
        }
        else if (name === 'contact_email') {
            if (newCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                mainCustomerData.contact_email = targetValue
                setNewCustomerData(mainCustomerData)

                // if (changeCCCustomerData) {
                //     if (modifyCustomerData) {
                //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                //         mainCCCustomerData.cc_contact_email = targetValue
                //         setModifyCustomerData(mainCCCustomerData)
                //     }
                // }
            }
        }
        else if (name === 'contact_address') {
            if (newCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                mainCustomerData.contact_address = targetValue
                setNewCustomerData(mainCustomerData)

                // if (changeCCCustomerData) {
                //     if (modifyCustomerData) {
                //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                //         mainCCCustomerData.cc_contact_address = targetValue
                //         setModifyCustomerData(mainCCCustomerData)
                //     }
                // }
            }
        }
        else if (name === 'contact_city') {
            if (newCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                mainCustomerData.contact_city = targetValue
                setNewCustomerData(mainCustomerData)

                // if (changeCCCustomerData) {
                //     if (modifyCustomerData) {
                //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                //         mainCCCustomerData.cc_contact_city = targetValue
                //         setModifyCustomerData(mainCCCustomerData)
                //     }
                // }
            }
        }
        else if (name === 'contact_state') {
            if (newCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                mainCustomerData.contact_state = targetValue
                setNewCustomerData(mainCustomerData)

                // if (changeCCCustomerData) {
                //     if (modifyCustomerData) {
                //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                //         mainCCCustomerData.cc_contact_state = targetValue
                //         setModifyCustomerData(mainCCCustomerData)
                //     }
                // }
            }
        }
        else if (name === 'contact_zip') {
            if (/^\d+$/.test(targetValue) || targetValue.length === 0) {
                if (formRef && formRef.current) {
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(targetValue);

                            if (newCustomerData) {
                                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                                mainCustomerData.contact_zip = targetValue
                                setNewCustomerData(mainCustomerData)
                            }

                            // if (changeCCCustomerData) {
                            //     for (let j = 0; j < newModel.length; j++) {
                            //         let newDicCC = newModel[j];
                            //         if (newDicCC.props.name === 'cc_contact_zip') {
                            //             newModel[j].setValue(targetValue);
                            //             break
                            //         }
                            //     }

                            //     if (modifyCustomerData) {
                            //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                            //         mainCCCustomerData.cc_contact_zip = targetValue
                            //         setModifyCustomerData(mainCCCustomerData)
                            //     }
                            // }
                            break
                        }
                    }
                }
            }
            else {
                if (formRef && formRef.current) {
                    let model = formRef.current.getModel();
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(model.contact_zip);

                            if (newCustomerData) {
                                let mainCustomerData = JSON.parse(JSON.stringify(newCustomerData));
                                mainCustomerData.contact_zip = model.contact_zip
                                setNewCustomerData(mainCustomerData)
                            }

                            // if (changeCCCustomerData) {
                            //     let chechModel = false
                            //     let chechModelVal = ''
                            //     for (let j = 0; j < newModel.length; j++) {
                            //         let newDicCC = newModel[j];
                            //         if (newDicCC.props.name === 'cc_contact_zip') {
                            //             chechModel = true
                            //             chechModelVal = model.cc_contact_zip
                            //             newModel[j].setValue(model.cc_contact_zip);
                            //             break
                            //         }
                            //     }

                            //     if (modifyCustomerData) {
                            //         let mainCCCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                            //         if (chechModel) {
                            //             mainCCCustomerData.cc_contact_zip = chechModelVal
                            //         }
                            //         else {
                            //             mainCCCustomerData.cc_contact_zip = mainCCCustomerData.cc_contact_zip
                            //         }
                            //         setModifyCustomerData(mainCCCustomerData)
                            //     }
                            // }
                            break
                        }
                    }
                }
            }
        }
        else if (name === 'cc_contact_name') {
            if (modifyCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                mainCustomerData.cc_contact_name = targetValue
                setModifyCustomerData(mainCustomerData)
            }
        }
        else if (name === 'cc_contact_email') {
            if (modifyCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                mainCustomerData.cc_contact_email = targetValue
                setModifyCustomerData(mainCustomerData)
            }
        }
        else if (name === 'cc_contact_address') {
            if (modifyCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                mainCustomerData.cc_contact_address = targetValue
                setModifyCustomerData(mainCustomerData)
            }
        }
        else if (name === 'cc_contact_city') {
            if (modifyCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                mainCustomerData.cc_contact_city = targetValue
                setModifyCustomerData(mainCustomerData)
            }
        }
        else if (name === 'cc_contact_state') {
            if (modifyCustomerData) {
                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                mainCustomerData.cc_contact_state = targetValue
                setModifyCustomerData(mainCustomerData)
            }
        }
        else if (name === 'cc_contact_zip') {
            if (/^\d+$/.test(targetValue) || targetValue.length === 0) {
                if (formRef && formRef.current) {
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(targetValue);

                            if (modifyCustomerData) {
                                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                                mainCustomerData.cc_contact_zip = targetValue
                                setModifyCustomerData(mainCustomerData)
                            }
                            break
                        }
                    }
                }
            }
            else {
                if (formRef && formRef.current) {
                    let model = formRef.current.getModel();
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(model.cc_contact_zip);

                            if (modifyCustomerData) {
                                let mainCustomerData = JSON.parse(JSON.stringify(modifyCustomerData));
                                mainCustomerData.cc_contact_zip = model.cc_contact_zip
                                setModifyCustomerData(mainCustomerData)
                            }
                            break
                        }
                    }
                }
            }
        }
        else if (name === 'card_number') {
            if (targetValue.length < 17) {
                if (/^\d+$/.test(targetValue) || targetValue.length === 0) {
                    setCardNumber(targetValue)
                    if (formRef && formRef.current) {
                        let newModel = formRef.current.inputs;
                        for (let i = 0; i < newModel.length; i++) {
                            let newDic = newModel[i];
                            if (newDic.props.name === name) {
                                newModel[i].setValue(targetValue);
                                break
                            }
                        }
                    }
                }
                else {
                    if (formRef && formRef.current) {
                        let model = formRef.current.getModel();
                        let newModel = formRef.current.inputs;
                        for (let i = 0; i < newModel.length; i++) {
                            let newDic = newModel[i];
                            if (newDic.props.name === name) {
                                newModel[i].setValue(model.card_number);
                                break
                            }
                        }
                    }
                }
            }
            else {
                if (formRef && formRef.current) {
                    let model = formRef.current.getModel();
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(model.card_number);
                            break
                        }
                    }
                }
            }
        }
        else if (name === 'exp_date') {
            if (targetValue.length < 6) {
                const dateDigit = targetValue.split("/").join('');
                if (/^\d+$/.test(dateDigit) || dateDigit.length === 0) {
                    let textTemp = '';
                    if (dateDigit.length <= 2) {
                        textTemp = dateDigit
                    }
                    else if (dateDigit.length <= 3) {
                        let startDigit = dateDigit.substring(0, 2)
                        let endDigit = dateDigit.substring(2, 3)
                        textTemp = startDigit + '/' + endDigit
                    }
                    else if (dateDigit.length <= 4) {
                        let startDigit = dateDigit.substring(0, 2)
                        let endDigit = dateDigit.substring(2, 4)
                        textTemp = startDigit + '/' + endDigit

                        if (dateDigit.length >= 4) {
                            setIsExpDateError('');
                        }
                    } 

                    setExpDate(textTemp)
                    if (formRef && formRef.current) {
                        let newModel = formRef.current.inputs;
                        for (let i = 0; i < newModel.length; i++) {
                            let newDic = newModel[i];
                            if (newDic.props.name === name) {
                                newModel[i].setValue(textTemp);
                                break
                            }
                        }
                    }
                }
                else {
                    if (formRef && formRef.current) {
                        let model = formRef.current.getModel();
                        let newModel = formRef.current.inputs;
                        for (let i = 0; i < newModel.length; i++) {
                            let newDic = newModel[i];
                            if (newDic.props.name === name) {
                                newModel[i].setValue(model.exp_date);
                                break
                            }
                        }
                    }
                }
            }
            else {
                if (formRef && formRef.current) {
                    let model = formRef.current.getModel();
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(model.exp_date);
                            break
                        }
                    }
                }
            }
        }
        else if (name === 'cvv') {
            if (targetValue.length < 5) {
                if (/^\d+$/.test(targetValue) || targetValue.length === 0) {
                    setCvvText(targetValue)
                    if (formRef && formRef.current) {
                        let newModel = formRef.current.inputs;
                        for (let i = 0; i < newModel.length; i++) {
                            let newDic = newModel[i];
                            if (newDic.props.name === name) {
                                newModel[i].setValue(targetValue);
                                break
                            }
                        }
                    }
                }
                else {
                    if (formRef && formRef.current) {
                        let model = formRef.current.getModel();
                        let newModel = formRef.current.inputs;
                        for (let i = 0; i < newModel.length; i++) {
                            let newDic = newModel[i];
                            if (newDic.props.name === name) {
                                newModel[i].setValue(model.cvv);
                                break
                            }
                        }
                    }
                }
            }
            else {
                if (formRef && formRef.current) {
                    let model = formRef.current.getModel();
                    let newModel = formRef.current.inputs;
                    for (let i = 0; i < newModel.length; i++) {
                        let newDic = newModel[i];
                        if (newDic.props.name === name) {
                            newModel[i].setValue(model.cvv);
                            break
                        }
                    }
                }
            }
        }
    }

    // function canUpdateCustomerData() {
    //     let msg = []
    //     if (isModifyCustomerData) {
    //         if (modifyCustomerData) {
    //             if (modifyCustomerData.cc_contact_name !== '') {
    //             }
    //             else {
    //                 msg.push('Name is required')
    //             }

    //             if (modifyCustomerData.cc_contact_email !== '') {
    //                 if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(modifyCustomerData.cc_contact_email)) {
    //                     // console.log('valid email')
    //                 }
    //                 else {
    //                     msg.push('Invalid email')
    //                 }
    //             }
    //             else {
    //                 msg.push('Email address is required')
    //             }

    //             if (modifyCustomerData.cc_contact_address !== '') {
    //             }
    //             else {
    //                 msg.push('Address is required')
    //             }

    //             if (modifyCustomerData.cc_contact_city !== '') {
    //             }
    //             else {
    //                 msg.push('City is required')
    //             }

    //             if (modifyCustomerData.cc_contact_state !== '') {
    //             }
    //             else {
    //                 msg.push('State is required')
    //             }

    //             if (modifyCustomerData.cc_contact_zip !== '') {
    //             }
    //             else {
    //                 msg.push('Zip is required')
    //             }
    //         }
    //         else if (formRef && formRef.current) {
    //             let model = formRef.current.getModel();
    //             if (model.cc_contact_name !== '') {
    //             }
    //             else {
    //                 msg.push('Name is required')
    //             }

    //             if (model.cc_contact_email !== '') {
    //                 if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(model.cc_contact_email)) {
    //                     // console.log('valid email')
    //                 }
    //                 else {
    //                     msg.push('Invalid email')
    //                 }
    //             }
    //             else {
    //                 msg.push('Email address is required')
    //             }

    //             if (model.cc_contact_address !== '') {
    //             }
    //             else {
    //                 msg.push('Address is required')
    //             }

    //             if (model.cc_contact_city !== '') {
    //             }
    //             else {
    //                 msg.push('City is required')
    //             }

    //             if (model.cc_contact_state !== '') {
    //             }
    //             else {
    //                 msg.push('State is required')
    //             }

    //             if (model.cc_contact_zip !== '') {
    //             }
    //             else {
    //                 msg.push('Zip is required')
    //             }

    //         }
    //         else {
    //             msg.push('Customer data is required')
    //         }
    //     }

    //     if (msg.length > 0) {
    //         return true;
    //     } else {
    //         return (_.isEqual(JSON.stringify(saveCustomerData), JSON.stringify(modifyCustomerData)))
    //     }
    // }

    function handleUpdateCustomerData() {
        let finalCustData = {}
        let copyMainCustomerData = {}

        if (formRef && formRef.current) {
            let model = formRef.current.getModel();
            finalCustData.contact_name = model.contact_name
            finalCustData.contact_email = model.contact_email
            finalCustData.contact_address = model.contact_address
            finalCustData.contact_city = model.contact_city
            finalCustData.contact_state = model.contact_state
            finalCustData.contact_zip = model.contact_zip

            finalCustData.cc_contact_name = model.contact_name
            finalCustData.cc_contact_email = model.contact_email
            finalCustData.cc_contact_address = model.contact_address
            finalCustData.cc_contact_city = model.contact_city
            finalCustData.cc_contact_state = model.contact_state
            finalCustData.cc_contact_zip = model.contact_zip

            copyMainCustomerData.cc_contact_name = model.contact_name
            copyMainCustomerData.cc_contact_email = model.contact_email
            copyMainCustomerData.cc_contact_address = model.contact_address
            copyMainCustomerData.cc_contact_city = model.contact_city
            copyMainCustomerData.cc_contact_state = model.contact_state
            copyMainCustomerData.cc_contact_zip = model.contact_zip
        }
        else {
            finalCustData.contact_name = newCustomerData.contact_name
            finalCustData.contact_email = newCustomerData.contact_email
            finalCustData.contact_address = newCustomerData.contact_address
            finalCustData.contact_city = newCustomerData.contact_city
            finalCustData.contact_state = newCustomerData.contact_state
            finalCustData.contact_zip = newCustomerData.contact_zip

            finalCustData.cc_contact_name = newCustomerData.contact_name
            finalCustData.cc_contact_email = newCustomerData.contact_email
            finalCustData.cc_contact_address = newCustomerData.contact_address
            finalCustData.cc_contact_city = newCustomerData.contact_city
            finalCustData.cc_contact_state = newCustomerData.contact_state
            finalCustData.cc_contact_zip = newCustomerData.contact_zip

            copyMainCustomerData.cc_contact_name = newCustomerData.contact_name
            copyMainCustomerData.cc_contact_email = newCustomerData.contact_email
            copyMainCustomerData.cc_contact_address = newCustomerData.contact_address
            copyMainCustomerData.cc_contact_city = newCustomerData.contact_city
            copyMainCustomerData.cc_contact_state = newCustomerData.contact_state
            copyMainCustomerData.cc_contact_zip = newCustomerData.contact_zip
        }
        setModifyCustomerData(copyMainCustomerData)
        finalCustData.from_call = 0
        dispatch(Actions.saveUpdatedCustomerData(finalCustData));
    }
    // function handleUpdateCustomerData() {
    //     let msg = []
    //     let finalCustData = {}

    //     if (isModifyCustomerData) {
    //         if (formRef && formRef.current) {
    //             let model = formRef.current.getModel();
    //             finalCustData.contact_name = model.contact_name
    //             finalCustData.contact_email = model.contact_email
    //             finalCustData.contact_address = model.contact_address
    //             finalCustData.contact_city = model.contact_city
    //             finalCustData.contact_state = model.contact_state
    //             finalCustData.contact_zip = model.contact_zip

    //             if (model.cc_contact_name !== '') {
    //                 finalCustData.cc_contact_name = model.cc_contact_name
    //             }
    //             else {
    //                 msg.push('Name is required')
    //             }

    //             if (model.cc_contact_email !== '') {
    //                 if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(model.cc_contact_email)) {
    //                     // console.log('valid email')
    //                     finalCustData.cc_contact_email = model.cc_contact_email
    //                 }
    //                 else {
    //                     msg.push('Invalid email')
    //                 }
    //             }
    //             else {
    //                 msg.push('Email address is required')
    //             }

    //             if (model.cc_contact_address !== '') {
    //                 finalCustData.cc_contact_address = model.cc_contact_address
    //             }
    //             else {
    //                 msg.push('Address is required')
    //             }

    //             if (model.cc_contact_city !== '') {
    //                 finalCustData.cc_contact_city = model.cc_contact_city
    //             }
    //             else {
    //                 msg.push('City is required')
    //             }

    //             if (model.cc_contact_state !== '') {
    //                 finalCustData.cc_contact_state = model.cc_contact_state
    //             }
    //             else {
    //                 msg.push('State is required')
    //             }

    //             if (model.cc_contact_zip !== '') {
    //                 finalCustData.cc_contact_zip = model.cc_contact_zip
    //             }
    //             else {
    //                 msg.push('Zip is required')
    //             }

    //         }
    //         else {
    //             finalCustData.contact_name = newCustomerData.contact_name
    //             finalCustData.contact_email = newCustomerData.contact_email
    //             finalCustData.contact_address = newCustomerData.contact_address
    //             finalCustData.contact_city = newCustomerData.contact_city
    //             finalCustData.contact_state = newCustomerData.contact_state
    //             finalCustData.contact_zip = newCustomerData.contact_zip

    //             if (modifyCustomerData.cc_contact_name !== '') {
    //                 finalCustData.cc_contact_name = modifyCustomerData.cc_contact_name
    //             }
    //             else {
    //                 msg.push('Name is required')
    //             }

    //             if (modifyCustomerData.cc_contact_email !== '') {
    //                 if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(modifyCustomerData.cc_contact_email)) {
    //                     // console.log('valid email')
    //                     finalCustData.cc_contact_email = modifyCustomerData.cc_contact_email
    //                 }
    //                 else {
    //                     msg.push('Invalid email')
    //                 }
    //             }
    //             else {
    //                 msg.push('Email address is required')
    //             }

    //             if (modifyCustomerData.cc_contact_address !== '') {
    //                 finalCustData.cc_contact_address = modifyCustomerData.cc_contact_address
    //             }
    //             else {
    //                 msg.push('Address is required')
    //             }

    //             if (modifyCustomerData.cc_contact_city !== '') {
    //                 finalCustData.cc_contact_city = modifyCustomerData.cc_contact_city
    //             }
    //             else {
    //                 msg.push('City is required')
    //             }

    //             if (modifyCustomerData.cc_contact_state !== '') {
    //                 finalCustData.cc_contact_state = modifyCustomerData.cc_contact_state
    //             }
    //             else {
    //                 msg.push('State is required')
    //             }

    //             if (modifyCustomerData.cc_contact_zip !== '') {
    //                 finalCustData.cc_contact_zip = modifyCustomerData.cc_contact_zip
    //             }
    //             else {
    //                 msg.push('Zip is required')
    //             }
    //         }
    //     }

    //     if (msg.length > 0) {
    //         dispatch(Actions.showMessage({ message: msg.join(', ') }));
    //     } else {
    //         if (isModifyCustomerData) {
    //             finalCustData.from_call = 0
    //             dispatch(Actions.saveUpdatedCustomerData(finalCustData));
    //         }
    //         setIsModifyCustomerData(!isModifyCustomerData);
    //         dispatch(Actions.changeCCCustomerDataDetails(false));
    //     }
    // }

    function handleChangeExpiryText(name, event) {
        let targetValue = event.target.value;
        setExpDate(targetValue)
    }

    const validateExpiry = () => {
        if (expDate !== '') {
            var date = expDate.split('/')
            if (date && date.length > 1) {
                if ((date[0] === '__') || (date[1] === '__')) {
                    return false
                }
                if (Number(date[1]) >= Number(YEAR[0]) && date[1].length < 5) {
                    if (Number(date[1]) == Number(YEAR[0])) {
                        if (Number(date[0]) > Number(MONTH) && Number(date[0]) < 13) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (Number(date[1]) > Number(YEAR[0])) {
                        if (Number(date[0]) >= 1 && Number(date[0]) < 13) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        }
        else {
            return false
        }
    }

    function handleSubmitReview() {
        if (formRef && formRef.current) {
            let msg = []
            let model = formRef.current.getModel();
            let newModelInput = formRef.current.inputs;
            if (model.contact_name !== '') {
                setIsContactNameError('');
            }
            else {
                msg.push('Contact name is required');

                setIsContactNameError('Contact name is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'contact_name') {
                        newModelInput[i].setValue(model.contact_name);
                        break
                    }
                }
            }

            if (model.contact_email !== '') {
                if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(model.contact_email)) {
                    // console.log('valid email')
                    setIsContactEmailError('');
                }
                else {
                    msg.push('Invalid contact email');

                    setIsContactEmailError('Invalid contact email');
                    for (let i = 0; i < newModelInput.length; i++) {
                        let newDic = newModelInput[i];
                        if (newDic.props.name === 'contact_email') {
                            newModelInput[i].setValue(model.contact_email);
                            break
                        }
                    }
                }
            }
            else {
                msg.push('Contact email address is required');

                setIsContactEmailError('Contact email address is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'contact_email') {
                        newModelInput[i].setValue(model.contact_email);
                        break
                    }
                }
            }

            if (model.contact_address !== '') {
                setIsContactAddressError('');
            }
            else {
                msg.push('Contact address is required')
                setIsContactAddressError('Contact address is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'contact_address') {
                        newModelInput[i].setValue(model.contact_address);
                        break
                    }
                }
            }

            if (model.contact_city !== '') {
                setIsContactCityError('');
            }
            else {
                msg.push('Contact city is required');
                setIsContactCityError('Contact city is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'contact_city') {
                        newModelInput[i].setValue(model.contact_city);
                        break
                    }
                }
            }

            if (model.contact_state !== '') {
                setIsContactStateError('');
            }
            else {
                msg.push('Contact state is required');
                setIsContactStateError('Contact state is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'contact_state') {
                        newModelInput[i].setValue(model.contact_state);
                        break
                    }
                }
            }

            if (model.contact_zip !== '') {
                setIsContactZipError('');
            }
            else {
                msg.push('Contact zip is required');
                setIsContactZipError('Contact zip is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'contact_zip') {
                        newModelInput[i].setValue(model.contact_zip);
                        break
                    }
                }
            }

            if (modifyCustomerData.cc_contact_name !== '') {
                setIsCCContactNameError('');
            }
            else {
                msg.push('Name is required');
                setIsCCContactNameError('Name is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cc_contact_name') {
                        newModelInput[i].setValue(model.cc_contact_name);
                        break
                    }
                }
            }

            if (modifyCustomerData.cc_contact_email !== '') {
                if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(modifyCustomerData.cc_contact_email)) {
                    // console.log('valid email')
                    setIsCCContactEmailError('');
                }
                else {
                    msg.push('Invalid email');
                    setIsCCContactEmailError('Invalid email');
                    for (let i = 0; i < newModelInput.length; i++) {
                        let newDic = newModelInput[i];
                        if (newDic.props.name === 'cc_contact_email') {
                            newModelInput[i].setValue(model.cc_contact_email);
                            break
                        }
                    }
                }
            }
            else {
                msg.push('Email address is required');
                setIsCCContactEmailError('Email address is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cc_contact_email') {
                        newModelInput[i].setValue(model.cc_contact_email);
                        break
                    }
                }
            }

            if (modifyCustomerData.cc_contact_address !== '') {
                setIsCCContactAddressError('');
            }
            else {
                msg.push('Address is required');
                setIsCCContactAddressError('Address is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cc_contact_address') {
                        newModelInput[i].setValue(model.cc_contact_address);
                        break
                    }
                }
            }

            if (modifyCustomerData.cc_contact_city !== '') {
                setIsCCContactCityError('');
            }
            else {
                msg.push('City is required');
                setIsCCContactCityError('City is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cc_contact_city') {
                        newModelInput[i].setValue(model.cc_contact_city);
                        break
                    }
                }
            }

            if (modifyCustomerData.cc_contact_state !== '') {
                setIsCCContactStateError('');
            }
            else {
                msg.push('State is required');
                setIsCCContactStateError('State is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cc_contact_state') {
                        newModelInput[i].setValue(model.cc_contact_state);
                        break
                    }
                }
            }

            if (modifyCustomerData.cc_contact_zip !== '') {
                setIsCCContactZipError('');
            }
            else {
                msg.push('Zip is required');
                setIsCCContactZipError('Zip is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cc_contact_zip') {
                        newModelInput[i].setValue(model.cc_contact_zip);
                        break
                    }
                }
            }

            let last_card_number = ''
            if (model.card_number !== '') {
                if (model.card_number.length < 13) {
                    msg.push('Invalid card number');
                    setIsCardNumError('Invalid card number');
                    for (let i = 0; i < newModelInput.length; i++) {
                        let newDic = newModelInput[i];
                        if (newDic.props.name === 'card_number') {
                            newModelInput[i].setValue(model.card_number);
                            break
                        }
                    }
                }
                else {
                    if (model.card_number.length > 4) {
                        last_card_number = model.card_number.slice(-4);
                        setIsCardNumError('');
                    }
                    else {
                        msg.push('Invalid card number');
                        setIsCardNumError('Invalid card number');
                        for (let i = 0; i < newModelInput.length; i++) {
                            let newDic = newModelInput[i];
                            if (newDic.props.name === 'card_number') {
                                newModelInput[i].setValue(model.card_number);
                                break
                            }
                        }
                    }
                }
            }
            else {
                msg.push('Card number is required');
                setIsCardNumError('Card number is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'card_number') {
                        newModelInput[i].setValue(model.card_number);
                        break
                    }
                }
            }

            let newExpDate = ''
            if (validateExpiry()) {
                setIsExpDateError('');
                newExpDate = expDate.split('/').join('');
            }
            else {
                msg.push('Invalid expiry date');
                setIsExpDateError('Invalid expiry date');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'exp_date') {
                        newModelInput[i].setValue(model.exp_date);
                        break
                    }
                }
            }

            if (model.cvv !== '') {
                setIsCVVError('');
            }
            else {
                msg.push('CVV is required');
                setIsCVVError('CVV is required');
                for (let i = 0; i < newModelInput.length; i++) {
                    let newDic = newModelInput[i];
                    if (newDic.props.name === 'cvv') {
                        newModelInput[i].setValue(model.cvv);
                        break
                    }
                }
            }

            if (msg.length > 0) {
                // dispatch(Actions.showMessage({ message: msg.join(', ') }));
            } else {
                let finalCustData = {}
                if (updatedCustomerData) {
                    finalCustData.contact_name = model.contact_name
                    finalCustData.contact_email = model.contact_email
                    finalCustData.contact_address = model.contact_address
                    finalCustData.contact_city = model.contact_city
                    finalCustData.contact_state = model.contact_state
                    finalCustData.contact_zip = model.contact_zip
                    finalCustData.customer_id = updatedCustomerData.customer_id
                    finalCustData.customer_name = updatedCustomerData.customer_name

                    finalCustData.cc_contact_name = model.cc_contact_name
                    finalCustData.cc_contact_email = model.cc_contact_email
                    finalCustData.cc_contact_address = model.cc_contact_address
                    finalCustData.cc_contact_city = model.cc_contact_city
                    finalCustData.cc_contact_state = model.cc_contact_state
                    finalCustData.cc_contact_zip = model.cc_contact_zip
                }
                else {
                    finalCustData.contact_name = newCustomerData.contact_name
                    finalCustData.contact_email = newCustomerData.contact_email
                    finalCustData.contact_address = newCustomerData.contact_address
                    finalCustData.contact_city = newCustomerData.contact_city
                    finalCustData.contact_state = newCustomerData.contact_state
                    finalCustData.contact_zip = newCustomerData.contact_zip
                    finalCustData.customer_id = newCustomerData.customer_id
                    finalCustData.customer_name = newCustomerData.customer_name

                    finalCustData.cc_contact_name = modifyCustomerData.cc_contact_name
                    finalCustData.cc_contact_email = modifyCustomerData.cc_contact_email
                    finalCustData.cc_contact_address = modifyCustomerData.cc_contact_address
                    finalCustData.cc_contact_city = modifyCustomerData.cc_contact_city
                    finalCustData.cc_contact_state = modifyCustomerData.cc_contact_state
                    finalCustData.cc_contact_zip = modifyCustomerData.cc_contact_zip
                }
                finalCustData.card_number = model.card_number;
                finalCustData.card_number_last = last_card_number;
                finalCustData.expiry_date = newExpDate;
                finalCustData.cvv = model.cvv;
                finalCustData.from_call = 0
                dispatch(Actions.saveUpdatedCustomerData(finalCustData));

                props.handleNext();
            }
        }
    }
    // function handleSubmitReview() {
    //     if (formRef && formRef.current) {
    //         let msg = []
    //         let model = formRef.current.getModel();
    //         if (model.contact_name !== '') {
    //         }
    //         else {
    //             msg.push('Name is required')
    //         }

    //         if (model.contact_email !== '') {
    //             if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(model.contact_email)) {
    //                 // console.log('valid email')
    //             }
    //             else {
    //                 msg.push('Invalid email')
    //             }
    //         }
    //         else {
    //             msg.push('Email address is required')
    //         }

    //         if (model.contact_address !== '') {
    //         }
    //         else {
    //             msg.push('Address is required')
    //         }

    //         if (model.contact_city !== '') {
    //         }
    //         else {
    //             msg.push('City is required')
    //         }

    //         if (model.contact_state !== '') {
    //         }
    //         else {
    //             msg.push('State is required')
    //         }

    //         if (model.contact_zip !== '') {
    //         }
    //         else {
    //             msg.push('Zip is required')
    //         }

    //         let last_card_number = ''
    //         if (model.card_number !== '') {
    //             if (model.card_number.length > 4) {
    //                 last_card_number = model.card_number.slice(-4);
    //             }
    //             else {
    //                 msg.push('Invalid card number')
    //             }
    //         }
    //         else {
    //             msg.push('Card number is required')
    //         }

    //         let newExpDate = ''
    //         if (validateExpiry()) {
    //             newExpDate = expDate.split('/').join('');
    //         }
    //         else {
    //             msg.push('Invalid expiry date')
    //         }

    //         if (model.cvv !== '') {
    //         }
    //         else {
    //             msg.push('CVV is required')
    //         }

    //         if (msg.length > 0) {
    //             dispatch(Actions.showMessage({ message: msg.join(', ') }));
    //         } else {
    //             let finalCustData = {}
    //             if (updatedCustomerData) {
    //                 finalCustData.contact_name = updatedCustomerData.contact_name
    //                 finalCustData.contact_email = updatedCustomerData.contact_email
    //                 finalCustData.contact_address = updatedCustomerData.contact_address
    //                 finalCustData.contact_city = updatedCustomerData.contact_city
    //                 finalCustData.contact_state = updatedCustomerData.contact_state
    //                 finalCustData.contact_zip = updatedCustomerData.contact_zip
    //                 finalCustData.customer_id = updatedCustomerData.customer_id
    //                 finalCustData.customer_name = updatedCustomerData.customer_name
    //             }
    //             else {
    //                 finalCustData.contact_name = modifyCustomerData.contact_name
    //                 finalCustData.contact_email = modifyCustomerData.contact_email
    //                 finalCustData.contact_address = modifyCustomerData.contact_address
    //                 finalCustData.contact_city = modifyCustomerData.contact_city
    //                 finalCustData.contact_state = modifyCustomerData.contact_state
    //                 finalCustData.contact_zip = modifyCustomerData.contact_zip
    //                 finalCustData.customer_id = modifyCustomerData.customer_id
    //                 finalCustData.customer_name = modifyCustomerData.customer_name
    //             }
    //             finalCustData.card_number = model.card_number;
    //             finalCustData.card_number_last = last_card_number;
    //             finalCustData.expiry_date = newExpDate;
    //             finalCustData.cvv = model.cvv;
    //             finalCustData.from_call = 0
    //             dispatch(Actions.saveUpdatedCustomerData(finalCustData));

    //             props.handleNext();
    //         }
    //     }
    // }

    addValidationRule('isDateValid', (values, value) => {
        return isExpDateError !== '' ? false : true;
    });

    return ((customerData && newCustomerData) ?
        (<div className="flex flex-col w-full">
            <Typography variant="h6" className="font-bold" gutterBottom >{configAppConst.contactInfoTitle}</Typography><br />

            <Formsy ref={formRef} className="flex flex-col w-full">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} xl={6}>
                                <div className="w-full pr-0 sm:pr-32">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="contact_name"
                                        value={newCustomerData.contact_name}
                                        label="Name"
                                        onChange={handleChangeText('contact_name')}
                                        error={isContactNameError !== '' ? true : false}
                                        validationError={isContactNameError}
                                        validations={{ minLength: 1 }}
                                        validationErrors={{ minLength: 'Name is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    // disabled={true}//{(!isModifyCustomerData)}
                                    // inputProps={{
                                    //     // style: { textTransform: 'capitalize' },
                                    //     readOnly: (!isModifyCustomerData)
                                    // }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} xl={6}>
                                <div className="w-full pl-0 sm:pl-32">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="contact_email"
                                        value={newCustomerData.contact_email}
                                        label="Email Address"
                                        onChange={handleChangeText('contact_email')}
                                        error={isContactEmailError !== '' ? true : false}
                                        validationError={isContactEmailError}
                                        validations="isEmail"
                                        validationErrors={{
                                            isEmail: 'Please enter a valid email'
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    // disabled={true}//{(!isModifyCustomerData)}
                                    // inputProps={{
                                    //     readOnly: (!isModifyCustomerData)
                                    // }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <TextFieldFormsy
                            className="my-12"
                            type="text"
                            name="contact_address"
                            value={newCustomerData.contact_address}
                            label="Address"
                            onChange={handleChangeText('contact_address')}
                            error={isContactAddressError !== '' ? true : false}
                            validationError={isContactAddressError}
                            validations={{ minLength: 1 }}
                            validationErrors={{ minLength: 'Address is required' }}
                            variant="outlined"
                            fullWidth
                            required
                        // disabled={true}//{(!isModifyCustomerData)}
                        // inputProps={{
                        //     readOnly: (!isModifyCustomerData)
                        // }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} md={4} xl={4}>
                                <div className="w-full pr-0 sm:pr-32">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="contact_city"
                                        value={newCustomerData.contact_city}
                                        label="City"
                                        onChange={handleChangeText('contact_city')}
                                        error={isContactCityError !== '' ? true : false}
                                        validationError={isContactCityError}
                                        validations={{ minLength: 1 }}
                                        validationErrors={{ minLength: 'City is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    // disabled={true}//{(!isModifyCustomerData)}
                                    // inputProps={{
                                    //     readOnly: (!isModifyCustomerData)
                                    // }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} xl={4}>
                                <div className="w-full px-0 sm:px-16">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="contact_state"
                                        value={newCustomerData.contact_state}
                                        label="State"
                                        onChange={handleChangeText('contact_state')}
                                        error={isContactStateError !== '' ? true : false}
                                        validationError={isContactStateError}
                                        validations={{ minLength: 1 }}
                                        validationErrors={{ minLength: 'State is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    // disabled={true}//{(!isModifyCustomerData)}
                                    // inputProps={{
                                    //     readOnly: (!isModifyCustomerData)
                                    // }}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} xl={4}>
                                <div className="w-full pl-0 sm:pl-32">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="contact_zip"
                                        value={newCustomerData.contact_zip}
                                        label="Zip"
                                        onChange={handleChangeText('contact_zip')}
                                        error={isContactZipError !== '' ? true : false}
                                        validationError={isContactZipError}
                                        validations={{ minLength: 1 }}
                                        validationErrors={{ minLength: 'Zip is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    // disabled={true}//{(!isModifyCustomerData)}
                                    // inputProps={{
                                    //     readOnly: (!isModifyCustomerData)
                                    // }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} xl={12}>
                        <br />
                        <br />
                        <br />
                        <Grid container className="mb-8">
                            <div className="flex w-full items-center">
                                <Typography variant="h6" className="font-bold" gutterBottom >{configAppConst.creditCardTitle}</Typography>
                                <Button color="primary" size='small' className={classes.sameInfoButtonStyle} variant="contained"
                                    onClick={() => { handleUpdateCustomerData() }}>{configAppConst.sameContactInfoTitle}</Button>
                            </div>
                        </Grid>

                        {modifyCustomerData &&
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12} xl={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6} xl={6}>
                                            <div className="w-full pr-0 sm:pr-32">
                                                <TextFieldFormsy
                                                    className="my-2"
                                                    type="text"
                                                    name="cc_contact_name"
                                                    value={modifyCustomerData.cc_contact_name}
                                                    label="Name"
                                                    onChange={handleChangeText('cc_contact_name')}
                                                    error={isCCContactNameError !== '' ? true : false}
                                                    validationError={isCCContactNameError}
                                                    validations={{ minLength: 1 }}
                                                    validationErrors={{ minLength: 'Name is required' }}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                // disabled={(!isModifyCustomerData)}
                                                // inputProps={{
                                                //     // style: { textTransform: 'capitalize' },
                                                //     readOnly: (!isModifyCustomerData)
                                                // }}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} xl={6}>
                                            <div className="w-full pl-0 sm:pl-32">
                                                <TextFieldFormsy
                                                    className="my-2"
                                                    type="text"
                                                    name="cc_contact_email"
                                                    value={modifyCustomerData.cc_contact_email}
                                                    label="Email Address"
                                                    onChange={handleChangeText('cc_contact_email')}
                                                    error={isccContactEmailError !== '' ? true : false}
                                                    validationError={isccContactEmailError}
                                                    validations="isEmail"
                                                    validationErrors={{ isEmail: 'Please enter a valid email' }}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} xl={12}>
                                    <TextFieldFormsy
                                        className="my-12"
                                        type="text"
                                        name="cc_contact_address"
                                        value={modifyCustomerData.cc_contact_address}
                                        label="Address"
                                        onChange={handleChangeText('cc_contact_address')}
                                        error={isCCContactAddressError !== '' ? true : false}
                                        validationError={isCCContactAddressError}
                                        validations={{ minLength: 1 }}
                                        validationErrors={{ minLength: 'Address is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} md={12} xl={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4} md={4} xl={4}>
                                            <div className="w-full pr-0 sm:pr-32">
                                                <TextFieldFormsy
                                                    className="my-2"
                                                    type="text"
                                                    name="cc_contact_city"
                                                    value={modifyCustomerData.cc_contact_city}
                                                    label="City"
                                                    onChange={handleChangeText('cc_contact_city')}
                                                    error={isCCContactCityError !== '' ? true : false}
                                                    validationError={isCCContactCityError}
                                                    validations={{
                                                        minLength: 1
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'City is required'
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4} xl={4}>
                                            <div className="w-full px-0 sm:px-16">
                                                <TextFieldFormsy
                                                    className="my-2"
                                                    type="text"
                                                    name="cc_contact_state"
                                                    value={modifyCustomerData.cc_contact_state}
                                                    label="State"
                                                    onChange={handleChangeText('cc_contact_state')}
                                                    error={isCCContactStateError !== '' ? true : false}
                                                    validationError={isCCContactStateError}
                                                    validations={{
                                                        minLength: 1
                                                    }}
                                                    validationErrors={{
                                                        minLength: 'State is required'
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={4} xl={4}>
                                            <div className="w-full pl-0 sm:pl-32">
                                                <TextFieldFormsy
                                                    className="my-2"
                                                    type="text"
                                                    name="cc_contact_zip"
                                                    value={modifyCustomerData.cc_contact_zip}
                                                    label="Zip"
                                                    onChange={handleChangeText('cc_contact_zip')}
                                                    error={isCCContactZipError !== '' ? true : false}
                                                    validationError={isCCContactZipError}
                                                    validations={{ minLength: 1 }}
                                                    validationErrors={{
                                                        minLength: 'Zip is required'
                                                    }}
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        <br />
                        <br />

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={5} md={5} xl={5}>
                                <div className="w-full pr-0 sm:pr-36">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="card_number"
                                        label="Card Number"
                                        value={cardNumber}
                                        maxLength={19}
                                        onChange={handleChangeText('card_number')}
                                        error={isCardNumError !== '' ? true : false}
                                        validationError={isCardNumError}
                                        validations={{ minLength: 13 }}
                                        validationErrors={{ minLength: 'Card number is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} xl={3}>
                                <div className="w-full px-0 sm:px-20">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="exp_date"
                                        label="Exp. Date"
                                        placeholder="MM/YY"
                                        value={expDate}
                                        onChange={handleChangeText('exp_date')}
                                        maxLength={5}
                                        error={isExpDateError !== '' ? true : false}
                                        validationError={isExpDateError}
                                        validations="isDateValid"
                                        // validations={{ minLength: 5 }}
                                        // validationErrors={{ minLength: 'Exp date is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />

                                    {/* <MaskedInput
                                        margin="normal"
                                        className="my-2"
                                        style={{ margin: '0px 0px 0px 0px', width: '100%', height: '40px', borderRadius: '5px', border: '0.5px solid #E1DADA', fontSize: '14px', paddingLeft: '12px' }}
                                        mask="11/11"
                                        name="exp_date"
                                        value={expDate}
                                        placeholder="MM/YY"
                                        onChange={(event) => handleChangeExpiryText('exp_date', event)}
                                        render={(ref, props) => (
                                            <TextFieldFormsy innerRef={ref} {...props} label="Exp. Date" variant="outlined" />
                                        )}
                                    /> */}
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} xl={4}>
                                <div className="w-full pl-0 sm:pl-32">
                                    <TextFieldFormsy
                                        className="my-2"
                                        type="text"
                                        name="cvv"
                                        label="CVV"
                                        value={cvvText}
                                        onChange={handleChangeText('cvv')}
                                        maxLength={4}
                                        error={isCVVError !== '' ? true : false}
                                        validationError={isCVVError}
                                        validations={{ minLength: 1 }}
                                        validationErrors={{ minLength: 'cvv is required' }}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </div>
                            </Grid>
                        </Grid>

                        <br />
                        <br />
                    </Grid>

                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button onClick={() => {
                            dispatch(Actions.setPayPaymentObjectArrPosition('check_selected_payment'));
                            dispatch(Actions.resetCustomerData(null));
                            dispatch(Actions.saveUpdatedCustomerData(null));
                            dispatch(Actions.changeCCCustomerDataDetails(true));
                            props.handleBack();
                        }} variant="outlined" size="large" color="primary" className={classes.buttonStyle} >
                            {configAppConst.backTitle}
                        </Button>
                        <Button onClick={() => { handleSubmitReview() }} variant="contained" size="large" className={classes.buttonStyle2} color="primary" autoFocus>
                            {configAppConst.reviewTitle}
                        </Button>
                    </Grid>
                </Grid>
            </Formsy>
        </div>) : null
    )
}

export default PaymentInfoStepperComponent
