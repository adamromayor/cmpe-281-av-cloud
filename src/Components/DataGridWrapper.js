import { DataGrid } from "@mui/x-data-grid";

const DataGridWrapper = ({rows, columns, getRowId}) => {
    return ( 
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId = {getRowId}
            //checkboxSelection
            disableSelectionOnClick
        />
    </div> );
}

DataGridWrapper.defaultProprs = {
    getRowId: (row)=>row.id
}
export default DataGridWrapper;