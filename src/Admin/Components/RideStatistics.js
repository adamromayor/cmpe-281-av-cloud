import useFetch from "../../CustomHooks/useFetch";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import DataGridWrapper from "../../Components/DataGridWrapper";

const RideStatistics = ({av_id}) => {

    
    const {data:rides, isPending, error} = useFetch("/rides?av_id="+av_id);
    
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
            editable: false,
            sortable: false,
            width: 160,
          
        },
        {
            field: 'd_lat_lon',
            headerName: 'Destination',
            description: 'This column has a value getter and is not sortable.',
            editable: false,
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
            {!error && !isPending && rides &&
                <DataGridWrapper rows={rides} columns={columns} />
            }
        </Container>
    );
}
 
export default RideStatistics;