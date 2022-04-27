import useFetch from "../../CustomHooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

const RideStatistics = ({av_id}) => {

    
    const {data:rides, isPending, error} = useFetch("http://localhost:5050/rides?av_id="+av_id);
    
    useEffect(()=> {
        if(rides){
            rides.forEach(ride => {
                ride["s_lat_lon"] = ride.startLocation.replace("&",", ");
                ride["d_lat_lon"] = ride.finishLocation.replace("&",", ");
            }) 

        
        }
    }, [rides]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'username',
          headerName: 'Username',
          width: 110,
          editable: false,
          
        },
        {
          field: 's_lat_lon',
          headerName: 'Start Location',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          
        },
        {
            field: 'd_lat_lon',
            headerName: 'Destination',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            
          },
        {
            field: 'powerUsed',
            headerName: 'Power Used',
            width: 160,
            editable: false,
            sortable: true
          },
      ];


    return (  
        <Container className="py-3">
            <h2>Ride Statistics</h2>
            {!error && rides && <p>{rides.length} total trips provided.</p>}
            <div style={{ height: 400, width: '100%' }}>
                    {!isPending && !error && rides && <DataGrid
                        rows={rides}
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
 
export default RideStatistics;