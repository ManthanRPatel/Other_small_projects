import React from 'react';
import { IconButton, Icon } from '@material-ui/core';
// import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable, useExpanded } from 'react-table';
import clsx from 'clsx';
import CustomTablePaginationActions from './CustomTablePaginationActions';
import CustomFilterComponent from './CustomFilterComponent';
// import configAppConst from '../appConfigurations';
import { Typography, Tooltip } from '@material-ui/core';
// import moment from 'moment';
// import { serverBaseURL } from '../appsConfigs';
// import FuseUtils from '@fuse/utils';

// const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
// 	const defaultRef = React.useRef();
// 	const resolvedRef = ref || defaultRef;

// 	React.useEffect(() => {
// 		resolvedRef.current.indeterminate = indeterminate;
// 	}, [resolvedRef, indeterminate]);

// 	return (
// 		<>
// 			<Checkbox ref={resolvedRef} {...rest} />
// 		</>
// 	);
// });

const CustomTable = ({ columns, data, showFilter, currentPage, perPageSize, totalRecord, showPaginationView, onRowClick, onChangePage, onPageSizeChange, onFilteredChange, onRequestSort, renderRowSubComponent, expandRowId, expandRowData, expandRowClick }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		visibleColumns,
		// state: { pageIndex, pageSize, expanded }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true,
			initialState: { pageIndex: currentPage, pageSize: perPageSize }, // Pass our hoisted table state
			manualPagination: true,
		},
		useGlobalFilter,
		useSortBy,
		useExpanded,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns => [
				// Let's make a column for selection
				// {
				// 	id: 'selection',
				// 	sortable: false,
				// 	useGlobalFilter: true,
				// 	// The header can use the table's getToggleAllRowsSelectedProps method
				// 	// to render a checkbox.  Pagination is a problem since this will select all
				// 	// rows even though not all rows are on the current page.  The solution should
				// 	// be server side pagination.  For one, the clients should not download all
				// 	// rows in most cases.  The client should only download data for the current page.
				// 	// In that case, getToggleAllRowsSelectedProps works fine.
				// 	Header: ({ getToggleAllRowsSelectedProps }) => (
				// 		<div>
				// 			<IndeterminateCheckbox
				// 				{...getToggleAllRowsSelectedProps()}
				// 			// onChange={onSelectAllCheck}
				// 			// checked={
				// 			// 	selectedArr && data && selectedArr.length === Object.keys(data).length && selectedArr.length > 0}
				// 			// indeterminate={
				// 			// 	selectedArr && data && selectedArr.length !== Object.keys(data).length && selectedArr.length > 0}
				// 			/>
				// 		</div>
				// 	),
				// 	// The cell can use the individual row's getToggleRowSelectedProps method
				// 	// to the render a checkbox
				// 	Cell: ({ row }) => (
				// 		<div>
				// 			<IndeterminateCheckbox
				// 				{...row.getToggleRowSelectedProps()}
				// 			// onClick={ev => ev.stopPropagation()}
				// 			// checked={selectedArr.includes(row.original.project_id)}
				// 			// onChange={(event) => {
				// 			// 	onToggleCheck(event, row);
				// 			// }}
				// 			/>
				// 		</div>
				// 	)
				// },
				..._columns
			]);
		}
	);

	// Render the UI for your table
	return (
		<TableContainer className="sm:border-1 sm:rounded-8 bg-white">
			{/* min-h-full */}
			<MaUTable {...getTableProps()}>
				<TableHead>
					{headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<TableCell
									className="whitespace-no-wrap p-8"//p-12
									{...(!column.sortable
										? column.getHeaderProps()
										: column.getHeaderProps(column.getSortByToggleProps()))}
									onClick={(ev) => column.sortable ? onRequestSort(ev, column.key) : ''}
								>
									{column.render('Header')}
									{column.sortable ? (
										<TableSortLabel
											active={column.isSorted}
											// react-table has a unsorted state which is not treated here
											direction={column.isSortedDesc ? 'desc' : 'asc'}
										/>
									) : null}
								</TableCell>
							))}
						</TableRow>
					))}
					{showFilter && headerGroups.map(headerGroup => (
						<TableRow {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<TableCell
									className="whitespace-no-wrap p-8"//p-12
									key={headerGroup.getHeaderGroupProps().key + '_' + column.key}
								>
									{column.filterable ? (
										<CustomFilterComponent
											isNumberFilter={column.isnumeric ? column.isnumeric : false}
											onChange={(ev) => onFilteredChange(ev, column.key)}
										/>
									) : null}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<React.Fragment key={i + '_'}>
								<TableRow
									{...row.getRowProps()}
									onClick={(event) => { onRowClick(event, row) }}
									className="truncate cursor-pointer"
								>
									{row.cells.map(cell => {
										return (
											<TableCell
												{...cell.getCellProps()}
												// className={clsx('px-8 py-2', cell.column.className)}
											//p-12
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>

								{row.isExpanded && (row.id === expandRowId) &&
									<tr>
										<td colSpan={visibleColumns.length}>
											{renderRowSubComponent({ row })}
										</td>
									</tr>
								}

								{/* {row.isExpanded ? (
									<tr>
										<td colSpan={visibleColumns.length}>
											{renderRowSubComponent({ row })}
										</td>
									</tr>
								) : null
								} */}
							</React.Fragment>
						);
					})}
				</TableBody>

				{showPaginationView &&
					<TableFooter>
						<TableRow>
							<TablePagination
								classes={{
									// root: 'overflow-hidden',
									root: 'overflow-scroll',
									spacer: 'w-0 max-w-0'
								}}
								colSpan={7}
								count={totalRecord}
								page={currentPage}
								rowsPerPage={perPageSize}
								SelectProps={{
									inputProps: { 'aria-label': 'rows per page' },
									native: true
								}}
								onChangePage={onChangePage}
								onChangeRowsPerPage={onPageSizeChange}
								rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100]}
								ActionsComponent={CustomTablePaginationActions}
							// rowsPerPageOptions={[5, 10, 20, 30, 40, 50, 100, { label: 'All', value: data.length + 1 }]}
							/>
						</TableRow>
					</TableFooter>
				}
			</MaUTable>
		</TableContainer >
	);
};

CustomTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	showFilter: PropTypes.bool,
	currentPage: PropTypes.number,
	perPageSize: PropTypes.number,
	totalRecord: PropTypes.number,
	showPaginationView: PropTypes.bool,
	onRowClick: PropTypes.func,
	onChangePage: PropTypes.func,
	onPageSizeChange: PropTypes.func,
	onFilteredChange: PropTypes.func,
	onRequestSort: PropTypes.func,
	renderRowSubComponent: PropTypes.func,
	expandRowId: PropTypes.string,
	expandRowData: PropTypes.array,
	expandRowClick: PropTypes.func
};

export default CustomTable;