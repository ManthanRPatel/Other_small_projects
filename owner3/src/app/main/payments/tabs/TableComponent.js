import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Chip, IconButton, Icon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import FuseUtils from '@fuse/utils';
import configAppConst from '../../appConfigurations'

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const useStyles = makeStyles({
  table: {
    Width: '90%',
    transition: 'none !important',
    boxShadow: 'none !important',
    border: 'none !important',
    borderBottom: 'none !important',
    padding: '1%'
  },
  buttonStyle: {
    textTransform: 'none',
    margin: '1%'
  },
  buttonStyle2: {
    textTransform: 'none',
    // boxShadow: '2px 2px 20px #F4F8FB',
    margin: '1%'
  },
  removeButtonStyle2: {
    textTransform: 'none',
    // boxShadow: '2px 2px 20px #F4F8FB',
    margin: '1%',
    color: 'red'
  },
  tableRowStyle: {
    // borderBottom:'none !important',
    border: '1px solid #E1DADA',
    // borderRight:'0.3px solid #E1DADA',
    borderRadius: '4px',//'5%',
    margin: '0.1%'
  },
  tableRowFullStyle: {
    border: '0px solid #E1DADA !important',
    margin: '0.1%',
    marginBottom: '20px'
  },
  viewButtonStyle: {
    textTransform: 'none',
    marginTop: '8px'
  },
});

// function createData(name, date, amount, balance) {
//   return { name, date, amount, balance };
// }

// const rows = [
//   createData('Frozen yoghurt', '15 Jan', 600, 24000),
//   createData('Stefen Speilberg', "14 Feb", 900, 37000),
//   createData('Christofer', "12 Mar", 160, 24000),
//   createData('Nolan', "13 Sep", 370, 67000),
//   createData('Trefekic', "12 Mar", 160, 49000),
// ];

export default function TableComponent(props) {
  const { paymentAllData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const { cust_auth_token, paymentPayDetailArr, paymentList, showAllInvoice } = useSelector(({ PaymentsApp }) => PaymentsApp.payments);
  const [rowData, setRowData] = useState([]);
  const [showPayAllButton, setShowPayAllButton] = useState(false);

  useEffect(() => {
    if (paymentList) {
      let showPayCount = 0
      let newArr = [];
      const arr = Object.keys(paymentList).map((id) => paymentList[id]);
      for (let i = 0; i < arr.length; i++) {
        let newDic = arr[i];
        if ((newDic.payment_amount === null) || (newDic.payment_amount === '') || (Number(newDic.payment_amount) < 0)) {
          newDic.payment_amount = 0
        }
        if ((newDic.balance_amount === null) || (newDic.balance_amount === '') || (Number(newDic.balance_amount) < 0)) {
          newDic.balance_amount = 0
        }

        if (Number(newDic.balance_amount) <= 0) {
          showPayCount = showPayCount + 1
        }
        newArr.push(newDic);
      }
      setRowData(newArr);

      if (showPayCount === newArr.length) {
        setShowPayAllButton(false);
      }
      else {
        setShowPayAllButton(true);
      }
    } else {
      setRowData([]);
      setShowPayAllButton(false);
    }
  }, [paymentList]);

  return (
    (rowData && (rowData.length > 0)) ?
      (<React.Fragment>
        <Table className="tableMargin">
          <Thead className="mb-20">
            <Tr>
              <Th className="text-base font-normal pl-8" align="left">{configAppConst.invoiceTitle}</Th>
              <Th className="text-base font-normal" align="left">{configAppConst.dateTitle}</Th>
              <Th className="text-base font-normal" align="left">{configAppConst.amountTitle}</Th>
              <Th className="text-base font-normal" align="left">{configAppConst.balanceTitle}</Th>
              <Th className="text-base font-normal" align="center">{''}</Th>
              <Th className="text-base font-normal" align="left">{configAppConst.paymentTitle}</Th>
            </Tr>
          </Thead>
          {rowData && (rowData.length > 0) &&
            <Tbody>
              {!showAllInvoice ? (
                <Tr className={classes.tableRowStyle}>
                  <Td className="border-none pl-8" component="th" scope="row">
                    <div className="chipText items-center">
                      <Typography className="align-middle showTextRight">{rowData[0].payment_number}</Typography>
                      {(rowData[0].payment_for !== 'invoice') ?
                        <div className="showTextRight">
                          <Chip className="chipPadding" title={rowData[0].payment_for} size={"small"} color="primary" label={rowData[0].payment_for} />
                        </div>
                        : ''}
                    </div>
                  </Td>
                  <Td className="border-none" align="left">
                    <Typography className="showTextRight">{rowData[0].payment_date}</Typography>
                  </Td>
                  <Td className="border-none" align="left">
                    <Typography className="showTextRight">{('$' + FuseUtils.currencyFormat(rowData[0].payment_amount))}</Typography>
                  </Td>
                  <Td className="border-none" align="left">
                    <Typography className="showTextRight">{('$' + FuseUtils.currencyFormat(rowData[0].balance_amount))}</Typography>
                  </Td>
                  <Td className="border-none" align="center">
                    <Button size='small' className={classes.buttonStyle} color="primary" onClick={() => { props.onChangeViewData(rowData[0]) }}>{configAppConst.viewTitle}</Button>
                    {((rowData[0].balance_amount !== '') && (Number(rowData[0].balance_amount) > 0)) &&
                      <Button size='small'
                        className={((rowData[0].select_payment_amount !== '') && (Number(rowData[0].select_payment_amount) > 0)) ? classes.removeButtonStyle2 : classes.buttonStyle2}
                        color={"primary"}
                        onClick={() => {
                          if ((rowData[0].select_payment_amount !== '') && (Number(rowData[0].select_payment_amount) > 0)) {
                            dispatch(Actions.setClearPayPaymentObjectArrPosition(rowData[0].payment_id));
                          }
                          else {
                            let isPresent = false;
                            let newPayArr = []
                            if (paymentPayDetailArr && paymentPayDetailArr.length > 0) {
                              newPayArr = [...paymentPayDetailArr]
                              for (let i = 0; i < paymentPayDetailArr.length; i++) {
                                let paymentData = paymentPayDetailArr[i];
                                if (paymentData.payment_id === rowData[0].payment_id) {
                                  isPresent = true
                                  break
                                }
                              }
                            }

                            if (isPresent === false) {
                              newPayArr.push(rowData[0])
                            }
                            dispatch(Actions.setPayPaymentObjectArrPosition(rowData[0].payment_id));
                            dispatch(Actions.setPayPaymentObjectArr(newPayArr));
                          }
                        }}>{rowData[0].select_payment_amount ? ((Number(rowData[0].select_payment_amount) > 0) ? configAppConst.removeTitle : configAppConst.payTitle) : configAppConst.payTitle}</Button>
                    }
                  </Td>
                  <Td className="border-none" align="left">
                    <Typography className="showTextRight">{rowData[0].select_payment_amount ? ('$' + FuseUtils.currencyFormat(rowData[0].select_payment_amount)) : '$0'}</Typography>
                  </Td>
                </Tr>) :
                (<>
                  {rowData.map((row, index) => (
                    <React.Fragment key={index}>
                      <Tr className={classes.tableRowStyle} key={row.payment_id}>
                        <Td className="border-none pl-8 showTextRight" component="th" scope="row">
                          <div className="chipText items-center">
                            <Typography className="align-middle showTextRight">{row.payment_number}</Typography>
                            {(row.payment_for !== 'invoice') ?
                              <div className="showTextRight">
                                <Chip className="chipPadding" title={row.payment_for} size={"small"} color="primary"
                                  label={row.payment_for} />
                              </div>
                              : ''}
                          </div>
                        </Td>
                        <Td className="border-none showTextRight" align="left">
                          <Typography className="showTextRight">{row.payment_date}</Typography>
                        </Td>
                        <Td className="border-none showTextRight" align="left">
                          <Typography className="showTextRight">{('$' + FuseUtils.currencyFormat(row.payment_amount))}</Typography>
                        </Td>
                        <Td className="border-none showTextRight" align="left">
                          <Typography className="showTextRight">{('$' + FuseUtils.currencyFormat(row.balance_amount))}</Typography>
                        </Td>
                        <Td className="border-none showTextRight" align="center">
                          <Button size='small' className={classes.buttonStyle} color="primary" onClick={() => { props.onChangeViewData(row) }}>{configAppConst.viewTitle}</Button>
                          {((row.balance_amount !== '') && (Number(row.balance_amount) > 0)) &&
                            <Button size='small'
                              className={((row.select_payment_amount !== '') && (Number(row.select_payment_amount) > 0)) ? classes.removeButtonStyle2 : classes.buttonStyle2}
                              color={"primary"}
                              onClick={() => {
                                if ((row.select_payment_amount !== '') && (Number(row.select_payment_amount) > 0)) {
                                  dispatch(Actions.setClearPayPaymentObjectArrPosition(row.payment_id));
                                }
                                else {
                                  let isPresent = false;
                                  let newPayArr = []
                                  if (paymentPayDetailArr && paymentPayDetailArr.length > 0) {
                                    newPayArr = [...paymentPayDetailArr]
                                    for (let i = 0; i < paymentPayDetailArr.length; i++) {
                                      let paymentData = paymentPayDetailArr[i];
                                      if (paymentData.payment_id === row.payment_id) {
                                        isPresent = true
                                        break
                                      }
                                    }
                                  }

                                  if (isPresent === false) {
                                    newPayArr.push(row)
                                  }
                                  dispatch(Actions.setPayPaymentObjectArrPosition(row.payment_id));
                                  dispatch(Actions.setPayPaymentObjectArr(newPayArr));
                                }
                              }}>{row.select_payment_amount ? ((Number(row.select_payment_amount) > 0) ? configAppConst.removeTitle : configAppConst.payTitle) : configAppConst.payTitle}</Button>
                          }
                        </Td>
                        <Td className="border-none showTextRight" align="left">
                          <Typography className="showTextRight">{row.select_payment_amount ? ('$' + FuseUtils.currencyFormat(row.select_payment_amount)) : '$0'}</Typography>
                        </Td>
                      </Tr>
                      {((index + 1) !== rowData.length) &&
                        <br key={index} />
                        // <Tr className={classes.tableRowFullStyle} key={index}>
                        //   <Td></Td>
                        // </Tr>
                      }
                    </React.Fragment>
                  ))}
                </>)
              }
            </Tbody>
          }
        </Table>
        <div className="flex w-full">
          <div className="min-w-92">
            <Button onClick={() => {
              if (showAllInvoice) {
                dispatch(Actions.changeInvoicePaymentAmount('less_payment_list'));
                dispatch(Actions.setPayPaymentObjectArrPosition(-1));
                dispatch(Actions.setPayPaymentObjectArr(null));
              }
              else {
                if (paymentAllData && paymentAllData.customer_data) {
                  dispatch(Actions.changeInvoicePaymentAmount(''));
                  dispatch(Actions.showLoader('PROGRESS_LOADER', true));
                  dispatch(Actions.getPaymentList(cust_auth_token, paymentAllData.customer_data.customer_id, 1, paymentAllData.payment_for, 'full_payment_list'));
                }
              }
              dispatch(Actions.changeInvoiceFullView(!showAllInvoice));
            }} color="primary" className={classes.viewButtonStyle} >
              {showAllInvoice ? configAppConst.viewLessTitle : configAppConst.viewMoreTitle}
            </Button>
          </div>
          {showAllInvoice &&
            <div className="flex max-w-full justify-end ml-auto viewAllPadding">
              <Button onClick={() => {
                dispatch(Actions.setViewAllPaymentListData(true));
              }} color="primary" className={classes.viewButtonStyle} >
                {configAppConst.viewAllTitle}
              </Button>
              {showPayAllButton &&
                <Button onClick={() => {
                  dispatch(Actions.setPayAllPaymentListData(true));
                }} color="primary" className={classes.viewButtonStyle} >
                  {configAppConst.payAllTitle}
                </Button>
              }
            </div>
          }
        </div>
      </React.Fragment>)
      : null
  );
}
