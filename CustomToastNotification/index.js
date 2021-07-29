import React from 'react'
import './toastnotification.css'
import clsx from 'clsx'
import { Check2, InfoCircleFill } from 'react-bootstrap-icons'
import {  useDispatch ,useSelector } from 'react-redux';
import * as Actions from 'app/store/actions/common'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function Toast() {
    
    const { showMessage ,message, varient } = useSelector(({common})=> common.messageOptions )

    const dispatch = useDispatch();

    // console.log(" showMessage ,message, varient ",  showMessage ,message, varient)

    React.useEffect(() => {

        if( showMessage === true ){

            setTimeout((s) =>{
                dispatch(Actions.hideMessage());
            },5000)

            // if( varient === 'success' ){
            //     toast.success( message);
            // } else{
            //     toast.error( message);
            // }

        }
    }, [showMessage]);


    return (
        <React.Fragment>


            <div className={clsx(showMessage === true ? 'show' : '' )}  id="toast_custom">
                <div className=" flex justify-center items-center " id="img">
                    { varient === 'success' ? <Check2 color='#45e652' size='30' /> : <InfoCircleFill color='#e64550' size='30' />}
                </div>
                <div id="desc">{(message!== undefined) && message.toString()}</div>
            </div>

            {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> */}

        </React.Fragment>
    )
}
export default Toast;