import useFetch from "../../CustomHooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";

const ServiceRecords = ({av_id}) => {
    const {data:records, isPending, error} = useFetch("http://localhost:5050/serviceRecords?av_id="+av_id);
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'date',
            headerName: 'Date',
            width: 110,
            editable: false,
            sortable: true
        },
        {
          field: 'issue',
          headerName: 'Issue',
          width: 110,
          editable: false,
          sortable: true
          
        },
        {
          field: 'serviced_part',
          headerName: 'Serviced Part',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 160,
          
        },
        {
            field: 'technician',
            headerName: 'Technician',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
            
          },
      ];


    return (  
        <Container className="py-3">
            <h2>Service Records</h2>
            {isPending && <p>Loading...</p>}
            {!error && records && <p>{records.length} total service records.</p>}
            <div style={{ height: 400, width: '100%' }}>
                    {!error && records && <DataGrid
                        rows={records}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        //checkboxSelection
                        disableSelectionOnClick
                    />}
                </div>
        </Container>
    );
}
 
export default ServiceRecords;