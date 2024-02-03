import { ArrowDownward } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import React from 'react';
import DataTable from 'react-data-table-component';


const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
	rows: {
		style: {
			minHeight: '72px',
            fontSize:"1.3rem",
			
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px',
			paddingRight: '8px',
            fontSize:"1.2rem",
            fontWeight:"bold"
		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
			justfyContent:"center"
		},
	},
};
function DataTableBase(props) {
	return (
		<DataTable
			pagination
			selectableRowsComponent={Checkbox}
			selectableRowsComponentProps={selectProps}
			sortIcon={sortIcon}
            customStyles={customStyles}
			dense
			{...props}
		/>
	);
}

export default DataTableBase;