import React,{useEffect} from "react";
import { useTable  , useFilters, useGlobalFilter ,usePagination } from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import { fetchOwners, deleteOwner, handleInputChange, filterOwners } from "../action/OwnerActions";
import {useSelector , useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';
import { openAddEDitModal } from "../action/OwnerFormAction";


const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};

const Table = ({ columns, data }) => {
  // console.log("Data===" , data)
  // const { getTableProps, headerGroups, rows, prepareRow } = useTable({
  //   columns,
  //   data
  // });

  ////////// filters
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );
  ///////////

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,rows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
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
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {page.map((row, i) => { ///// page ne badle rows aave....
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
     <div>
     <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
       {"<<"}
     </button>{" "}
     <button onClick={() => previousPage()} disabled={!canPreviousPage}>
       {"<"}
     </button>{" "}
     <button onClick={() => nextPage()} disabled={!canNextPage}>
       {">"}
     </button>{" "}
     <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
       {">>"}
     </button>{" "}
     <span>
       Page{" "}
       <strong>
         {pageIndex + 1} of {pageOptions.length}
       </strong>{" "}
     </span>
     <span>
       | Go to page:{" "}
       <input
         type="number"
         defaultValue={pageIndex + 1}
         onChange={e => {
           const page = e.target.value ? Number(e.target.value) - 1 : 0;
           gotoPage(page);
         }}
         style={{ width: "100px" }}
       />
     </span>{" "}
     <select
       value={pageSize}
       onChange={e => {
         setPageSize(Number(e.target.value));
       }}
     >
       {[5,10, 20, 30, 40, 50].map(pageSize => (
         <option key={pageSize} value={pageSize}>
           Show {pageSize}
         </option>
       ))}
     </select>
   </div>
   </>    
  );
};

function OwnerTable() {

  const ownerData = useSelector(state => state.owner.owners )
  const filterData = useSelector(state => state.owner )
  // const formData = useSelector(state => state.form )
  const dispatch = useDispatch()
  const [columnData, setColumnData] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);


  // console.log("ownerData == ",ownerData)

  useEffect(()=>{
    dispatch(fetchOwners())
  },[])

  useEffect(() => {
    if (ownerData) {
        let newArr = [];
        const arr = Object.keys(ownerData).map((id) => ownerData[id]);
        for (let i = 0; i < arr.length; i++) {
            let newDic = arr[i];
            newArr.push(newDic);
        }
        setRowData(newArr);
    } else {
      setRowData([]);
    }
}, [ownerData, dispatch]);

  useEffect(() => {
    let newColumn = [{
      Header: 'Full Name',
      accessor: 'full_name',
      key: 'full_name',
      width: 100,
      filterable: true,
      filter: "text",
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
  width: 100,
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
},{
  Header: 'Action',
  accessor: "action",
  key: 'action',
  width: 100,
  sortable: false,
  Cell: ({ row:{ original } }) => {
    // console.log("row===", original)

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
        })) }
      >Edit</Button>
      <Button  variant="contained" color="default"
      onClick={e=>{ if(window.confirm('Are You Sure want to delete : '+ original.full_name +' ?')) dispatch(deleteOwner(original.user_id))  }  }
      >Delete</Button>
    </div>
    )
  }

}];
    
  setColumnData(newColumn);
}, [dispatch, rowData]);

  console.log("OwnerTable is called")
  // console.log("row Data ===",rowData)

  const searchTopHandle = (e) =>{
    dispatch(handleInputChange(e.target)) //e.target
    dispatch(filterOwners({ searchTop: e.target.value }))
  }

  return (
    <div className="App">
      <TextField style={{zIndex:"0"}} value={filterData.searchTop} name="searchTop" 
          onChange={searchTopHandle} id="outlined-basic" 
          variant="outlined"  label="Search"   />
      <Table columns={columnData} data={rowData} />
    </div>
  );
}


export default OwnerTable;
