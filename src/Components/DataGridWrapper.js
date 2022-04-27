import { DataGrid } from "@mui/x-data-grid";

const DataGridWrapper = ({rows, columns}) => {
    return ( 
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            //checkboxSelection
            disableSelectionOnClick
        />
    </div> );
}
 
export default DataGridWrapper;