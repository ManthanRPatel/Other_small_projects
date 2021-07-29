import React, { Component } from 'react'
import { Provider } from 'react-redux'
import OwnerStore from './OwnerStore'
import OwnerAddEdit from './components/OwnerAddEdit'
import OwnerTable from './components/OwnerTable'
import OwnerTable2 from './components/OwnerTable2'



export default class MainApp extends Component {
    render() {
        return (
            <>
                <Provider store={OwnerStore} >
                    <h1><strong>Owner Info</strong></h1>
                    <OwnerTable2 />
                    {/* <OwnerAddEdit /><br />
                    <OwnerTable /> */}
                </Provider>
            </>
        )
    }
}

