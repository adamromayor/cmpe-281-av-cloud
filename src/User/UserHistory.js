import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap"
import DataGridWrapper from "../Components/DataGridWrapper";
import useFetch from "../CustomHooks/useFetch";

const UserHistory = () => {
    
    const username = localStorage.getItem('username')
    const url = "/user/" + username + "/booking/history"
    const {data:rides, isPending, error} = useFetch(url);
    const [bookingHistory, setBookingHistory] = useState(null)

    useEffect(()=> {
        if(rides && rides.status===200 && rides.bookings){
            console.log("RIDES: ", rides)

            var hist = rides.bookings;
            for(var i=0; i < hist.length; i++){
                const start = rides.bookings[i].Start;
                const dest = rides.bookings[i].Finish
                
                var date;
                if(rides.bookings[i].Date)
                    date = new Date(rides.bookings[i].Date);
                else
                    date = null;
                
                rides.bookings[i].s_lat_lon = start ? start.replace("&",", ") : "No Location";
                rides.bookings[i].d_lat_lon = dest ? dest.replace("&",", ") : "No Destination";
                rides.bookings[i].Date  = date ? date.toLocaleString().split(',')[0] : "5/4/2022";
                rides.bookings[i].id = i; // each row needs a unique ID
            }
            setBookingHistory(rides.bookings)
            
        }
    }, [rides, bookingHistory]);

    const columns: GridColDef[] = [
        { field: 'AV_ID', headerName: 'AV ID', width: 100 },
        {
            field: 'Date',
            headerName: 'Date',
            width: 110,
            editable: false,
            sortable: true
        },
        {
            field: 'Status',
            headerName: 'Status',
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
            field: 'Cost',
            headerName: 'Cost',
            width: 160,
            editable: false,
            sortable: true
        },
      ];
    
    
    return ( 
    <Container>
        <Row className="mt-3">
            <h2>Booking History</h2> 
        </Row>
        
        {isPending && !error && <p>Loading...</p>}
        {!error && rides && !rides.bookings &&    
            <p>{rides.message}</p>
        }
        {!error && rides && rides.status===200 && rides.bookings &&
                <p>{rides.bookings.length} rides.</p>
        }
        {!error && !isPending && rides && rides.status===200 &&  bookingHistory &&
            <DataGridWrapper rows={bookingHistory} columns={columns} getRowId={(row)=>row.id}/>
        }




    </Container>
    )
}
 
export default UserHistory;