import useFetch from "../../CustomHooks/useFetch";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import DataGridWrapper from "../../Components/DataGridWrapper";

const RideStatistics = ({av_id}) => {

    const url = "/admin/av/" + av_id + "/ride/history"
    const {data:rides, isPending, error} = useFetch(url);
    
    useEffect(()=> {
        if(rides && rides.status===200){
            rides.AV_Ride_History.forEach(ride => {
                
                var date;
                if(ride.Ride_Date)
                    date = new Date(ride.Ride_Date);
                else   
                    date = null                
                ride.s_lat_lon = ride.Start_Location ? ride.Start_Location.replace("&",", ") : "No Location";
                ride.d_lat_lon = ride.End_Location ? ride.End_Location.replace("&",", ") : "No Destination";
                ride.Ride_Date  = date ? date.toLocaleString().split(',')[0] : "No Date";
                ride.Estimated_Arrival = ride.Estimated_Arrival ? ride.Estimated_Arrival : "Complete";
            }) 
            //console.log(rides)
        }
    }, [rides]);

    const columns: GridColDef[] = [
        { field: 'Ride_ID', headerName: 'Ride ID', width: 100 },
        {
            field: 'Ride_Date',
            headerName: 'Date',
            width: 110,
            editable: false,
            sortable: true
        },
        {
            field: 'Username',
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
            field: 'Estimated_Arrival',
            headerName: 'Estimate Arrival',
            width: 160,
            editable: false,
            sortable: true
        },
      ];


    return (  
        <Container className="py-3">
            <h2>Ride Statistics</h2>
            {isPending && !error && <p>Loading...</p>}
            {!error && rides && rides.status!==200 && <p>No AV Ride History Available</p>}
            {!error && rides && rides.status===200 &&
                <p>{rides.AV_Ride_History.length} total trips provided.</p>
            }
            {!error && !isPending && rides && rides.status===200 &&
                <DataGridWrapper rows={rides.AV_Ride_History} columns={columns} getRowId={(row)=>row.Ride_ID}/>
            }
        </Container>
    );
}
 
export default RideStatistics;