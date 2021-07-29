import React,{useEffect} from "react";
import { useTable  , useFilters, useGlobalFilter ,usePagination } from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import { fetchOwners, deleteOwner, handleInputChange, handleFilterChange } from "../action/OwnerActions";
import {useSelector , useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';
import { openAddEDitModal } from "../action/OwnerFormAction";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter,id, finalFilter,setNewFilterValue },column
}) => {
  const count = preFilteredRows.length;

  // console.log("id === ",id)
  // console.log("column === ",column)

  return (
    <input
      // value={(filterValue ? filterValue: setNewFilterValue )|| ""}
      value={(setNewFilterValue ? setNewFilterValue: filterValue )|| ""}
      // value={filterValue || ""}
      onChange={e => {
        console.log("filter value==", filterValue )
        finalFilter({id : id, filterValue: e.target.value });
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const Table = ({ columns, data }) => {

  ////////// filters main filter element
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {

        console.log("id ====",id)
        console.log("rows ====",rows)
        console.log("filterValue ====",filterValue)

        return rows; ////// if you don't want frontend filter,,,...

        // return rows.filter(row => {
        //   const rowValue = row.values[id];
        //   return rowValue !== undefined
        //     ? String(rowValue)
        //         .toLowerCase()
        //         .startsWith(String(filterValue).toLowerCase())
        //     : true;
        // });
      }
    }),
    []
  );
  ///////////

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <>
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
                <div>{column.filterable ? column.render("Filter") : null}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => { ///// page ne badle rows aave....front end ma filter pagination karva "page" lakho..
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
   </>    
  );
};

function OwnerTable() {

  const ownerData = useSelector(state => state.owner.owners )
  const filterData = useSelector(state => state.owner )
  const { searchTop , currentPage , rowPerPage ,totalRecords , filters ,message } = useSelector(state => state.owner )


  const dispatch = useDispatch()
  const [columnData, setColumnData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState('');
  const [open, setOpen] = React.useState(false);

  console.log("owner Table is called")
  console.log("filterData is called outside 1 :===>",filterData)


  useEffect(()=>{
    console.log("filterData is called 2:===>",filterData)
    dispatch(fetchOwners(filterData))
  },[searchTop , currentPage , rowPerPage , totalRecords , filters , message ])

  // React.useMemo(()=>{
  //   console.log(" useMemo filterData is called 3:===>",filterData)
  //   dispatch(fetchOwners(filterData))
  // },[ searchTop , currentPage , rowPerPage , totalRecords , filters , message ])

  

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
      sortable: true,
      setNewFilterValue: ({ row:{ original } }) => {
        return (
          // original.filterParams
          filterData.filters[0].value.filterValue
        )},
      finalFilter: ({id,filterValue}) => {
        console.log('get final filter : ', id , " filtervlaue :", filterValue);
        dispatch(handleFilterChange({id: id ,filterValue : filterValue }))
        // filterData.filters[0].value.filterValue = filterValue
        // dispatch(fetchOwners({...filterData }))
      }
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

  var totalPages = Math.ceil(filterData.totalRecords/filterData.rowPerPage);
  console.log("totalPages is called",totalPages)

  const searchTopHandle = (e) =>{
    dispatch(handleInputChange(e.target))
  }

  const OnFirstPageMove =()=>{
    console.log("{<<} is called")
    dispatch(  handleInputChange({name:"currentPage" , value: 1 })   )
  }

  const OnBackPageMove =()=>{
    console.log("{<} is called")
    dispatch(handleInputChange({name:"currentPage" , value: filterData.currentPage - 1 }))
  }

  const OnForwardPageMove = () =>{
    console.log("{>} is called")
    dispatch(handleInputChange({name:"currentPage" , value: filterData.currentPage + 1 }))
  }

  const OnLastPageMove = () =>{
      console.log("{>>} is called")
      dispatch(handleInputChange({name:"currentPage" , value:( totalPages) }))
  }

  const CurrentPageChange = (e)=>{
    console.log("Current page is called...")
    dispatch(handleInputChange(e.target));  
  }

  const RowPerPageChange = (e) =>{
    dispatch(handleInputChange(e.target))
  }

  return (
    <div className="App">


      <TextField style={{zIndex:"0"}} value={filterData.searchTop} name="searchTop" 
          onChange={searchTopHandle} id="outlined-basic" 
          variant="outlined"  label="Search"   />


      <Table columns={columnData} data={rowData} />

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

    <Button  variant="contained" color="primary" onClick={ OnFirstPageMove } 
    disabled={(filterData.currentPage <= 1 )} >  {"<<"}  </Button>{" "}

     <Button  variant="contained" color="primary" onClick={ OnBackPageMove }
       disabled={(filterData.currentPage <= 1 )} > {"<"} </Button>{" "}
       
     <Button  variant="contained" color="primary" onClick={OnForwardPageMove } 
      disabled={(filterData.currentPage >= totalPages)}
      >{">"}</Button>{" "}

     <Button  variant="contained" color="primary" onClick={ OnLastPageMove } 
     disabled={(filterData.currentPage >= totalPages)} > {">>"} </Button>{" "}

     <span>
       Page{" "}
       <strong>
         {filterData.currentPage } of {" "}
         { totalPages && totalPages > 0 && totalPages  }
       </strong>{" "}
     </span>

     <span>
       | Go to page:{" "}
       <TextField style={{zIndex:"0"}} type="number" name="currentPage"
        value={filterData.currentPage} 
        onChange={ CurrentPageChange }
        variant="outlined"  label="Current Page" />
     </span>{" "}
      <select name="rowPerPage"
       onChange={RowPerPageChange} 
       value={filterData.rowPerPage} >
       {[5,10, 20, 30, 40, 50].map(pageSize => (
         <option key={pageSize} value={pageSize}>
           Show {pageSize}
         </option>
       ))}
     </select>
     
    </div>
  );
}


export default OwnerTable;
