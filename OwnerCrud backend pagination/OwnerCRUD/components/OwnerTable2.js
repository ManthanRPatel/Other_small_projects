import React, { useEffect, useState, useRef } from 'react';
import { Checkbox, Icon, IconButton, Button, Tooltip, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from './CustomTable';
import TextField from '@material-ui/core/TextField';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import { fetchOwners, deleteOwner, handleInputChange, handleFilterChange } from "../action/OwnerActions";
import { openAddEDitModal } from '../action/OwnerFormAction';



export default function OwnerTable2(props){
    const dispatch = useDispatch();
    const ownerData = useSelector(state => state.owner.owners )
    const filterData = useSelector(state => state.owner )
    const { searchTop , currentPage , rowPerPage ,totalRecords , filters ,message } = useSelector(state => state.owner )
    const tableRef = useRef(null);


    const [columnData, setColumnData] = React.useState([]);
    const [rowData, setRowData] = React.useState([]);
    const [deleteId, setDeleteId] = React.useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        console.log("filterData is called 2:===>",filterData)
        dispatch(fetchOwners(filterData))
      },[searchTop , currentPage , rowPerPage , totalRecords , filters , message ])

    useEffect(() => {
    if (ownerData) {
        let newArr = [];
        const arr = Object.keys(ownerData).map((id) => ownerData[id]);
        for (let i = 0; i < arr.length; i++) {
            let newDic = arr[i];
            newDic.filterParams = ''
            newArr.push(newDic);
        }
        setRowData(newArr);
    } else {
        setRowData([]);
    }
}, [ownerData, dispatch]);

useEffect(() => {
    let newColumn = [
      {
        Header: 'User Id',
        accessor: 'user_id',
        key: 'user_id',
        filterable: true,
        filter: "text",
        sortable: true,
    },{
      Header: 'Profile Picture',
      accessor: "profile_pic",
      key: 'profile_pic',
      width: 100,
      sortable: false,
      Cell: ({ row:{ original } }) => {
      return(<>
          <img alt="new" style={{height:'100px',width:'100px',borderRadius:'10px'}} src={original.image_path} />
      </>)
      }
    },{
      Header: 'Full Name',
      accessor: 'full_name',
      key: 'full_name',
      filterable: true,
      filter: "text",
      filterValue:'bl',
      sortable: true
  },{
    Header: 'Email',
    accessor: 'email',
    key: 'email',
    filterable: true,
    filter: "text",
    sortable: true
},{
  Header: 'Mobile Number',
  accessor: 'mobile_number',
  key: 'mobile_number',
  filterable: true,
  sortable: true
},{
  Header: 'Gender',
  accessor: 'gender',
  key: 'gender',
  filterable: true,
  sortable: true
},{
  Header: 'Bio',
  accessor: 'bio',
  key: 'bio',
  filterable: true,
  sortable: true
},{
  Header: 'Role',
  accessor: 'role',
  key: 'role',
  filterable: true,
  sortable: true
},{
  Header: 'Active Status',
  accessor: 'is_active',
  key: 'is_active',
  filterable: true,
  sortable: true
},{
  Header: 'Hobby',
  accessor: 'hobby',
  key: 'hobby',
  filterable: true,
  sortable: true
}
,{
  Header: 'Action',
  accessor: "action",
  key: 'action',
  sortable: false,
  Cell: ({ row:{ original } }) => {
  return (
    <div>
      <Button variant="contained" color="primary"
        onClick={e=> dispatch(openAddEDitModal({
          actionType:'edit',
          userId: original.user_id,
          fullName: original.full_name,
          role:original.role,
          mobileNumber:original.mobile_number,
          email:original.email,
          isActive: (original.is_active === 1 ? true : false) ,
          hobby:original.hobby.split(','),
          gender: original.gender,
          bio: original.bio
        })) }>
         <EditIcon>Edit</EditIcon>
        </Button>
      <Button  variant="contained" color="default"
      onClick={e =>{ setDeleteId(original.user_id); setOpen(true); }}
      >
        <DeleteOutlineIcon>
           Delete
        </DeleteOutlineIcon>
      </Button>
    </div>
    )
  }

}];
    
  setColumnData(newColumn);
}, [dispatch, rowData]);

function scrollToRef(ref) {
    if (ref && ref.current) {
        ref.current.scrollIntoView();
    }
}


  var totalPages = Math.ceil(filterData.totalRecords/filterData.rowPerPage);
  console.log("totalPages is called",totalPages)

  const searchTopHandle = (e) =>{
    dispatch(handleInputChange(e.target))
  }

  const CurrentPageChange = (event, newPage)=>{
    console.log("Current page change called...")
    scrollToRef(tableRef);
    dispatch(handleInputChange({name:"currentPage",value:newPage}));  
  }

  const RowPerPageChange = (e) =>{
    scrollToRef(tableRef);
    dispatch(handleInputChange(e.target) );
  }

  function onFilteredChange(filtered, property) {
    // console.log('onFilteredChange: ', filtered);
    let newFilter = [];

    let addFilter = true;
    let newFilterObj = {}
    newFilterObj.id = property
    let newValObj = {}
    newValObj.filterType = filtered.filterType
    newValObj.filterValue = filtered.filterValue
    newFilterObj.value = newValObj

    if (ownerData && ownerData.length > 0) {
        ownerData.forEach(ele => {
            if (property === ele.id) {
                addFilter = false;

                let filterObj = {}
                filterObj.id = ele.id
                let valObj = {}
                valObj.filterType = filtered.filterType
                valObj.filterValue = filtered.filterValue
                filterObj.value = valObj
                newFilter.push(filterObj);
            }
            else {
                newFilter.push(ele);
            }
        });
    }
    if (addFilter) {
        newFilter.push(newFilterObj);
    }

    scrollToRef(tableRef);
    dispatch(handleInputChange({name:"currentPage",value:1}))
    dispatch(handleInputChange({name:"filters",value:newFilter}))
}

  return (
    <div className="App">
    <div ref={tableRef}></div>
      <TextField style={{zIndex:"0"}} value={filterData.searchTop} name="searchTop" 
          onChange={searchTopHandle} id="outlined-basic" 
          variant="outlined"  label="Search"   />


      <CustomTable 
      columns={columnData} 
      data={rowData}
      currentPage={ currentPage }
      perPageSize={rowPerPage}
      totalRecord={totalRecords}
      onRowClick={e=>{}}
      onChangePage={CurrentPageChange}
      onPageSizeChange={RowPerPageChange}
    //   onRequestSort={onSortedChange}
      onFilteredChange={onFilteredChange}
      showPaginationView={true}
      showFilter={true}
      />

      <Dialog
        open={open}
        onClose={e=>{ setOpen(false); setDeleteId(''); } }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Are You Sure Want To Delete Owner?"}</DialogTitle>
        <DialogActions>
          <Button onClick={e => setOpen(false)} variant="contained" color="default" autoFocus >
            Cancel
          </Button>
          <Button onClick={e =>{ setOpen(false); dispatch(deleteOwner(deleteId)); }} variant="contained" color="primary" >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );


}
