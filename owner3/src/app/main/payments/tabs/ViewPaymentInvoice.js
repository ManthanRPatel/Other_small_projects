import React from 'react';
import { Tooltip, Icon } from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import PDFViewer from 'pdf-viewer-reactjs'
import { serverBaseURL } from '../../appsConfigs';
import configAppConst from '../../appConfigurations'

function ViewPaymentInvoice(props) {
    return (
        <div className="flex flex-col w-full bg-cyan" style={{ backgroundColor: '#F4F8FB' }}>
            <div className="flex justify-center w-full" style={{ backgroundColor: '#F4F8FB' }}>
                <PDFViewer
                    document={{
                        url: serverBaseURL + 'pdfDisplay?auth_token=' + props.match.params.authToken + '&payment_id=' + props.match.params.paymentId + '&payment_for=' + props.match.params.paymentFor,
                    }}
                    hideRotation={true}
                />
            </div>
            <div className="flex w-full object-bottom justify-center" onClick={(e) => { e.stopPropagation(); }}>
                <div className="justify-center mx-8 absolute" style={{ marginTop: -90 }} onClick={(e) => { e.stopPropagation(); }}>
                    <Tooltip title={configAppConst.downloadTitle} placement="top">
                        <Icon className="text-blue" onClick={(e) => {
                            e.preventDefault();
                            window.location.href = serverBaseURL + 'pdfDisplay?auth_token=' + props.match.params.authToken + '&payment_id=' + props.match.params.paymentId + '&payment_for=' + props.match.params.paymentFor + '&is_download=1';
                        }}>get_app</Icon>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default withReducer('PaymentsApp', reducer)(ViewPaymentInvoice);