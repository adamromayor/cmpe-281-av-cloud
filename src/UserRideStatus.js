import { useContext, useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import useFetch from "./useFetch";
import { UserContext } from "./UserContext";

const UserRideStatus = () => {
    const username = localStorage.getItem("username");
    const url = "http://localhost:5050/rideTable?ride_status=in-progress&username=" + username
    const {data:ride, isPending, error} = useFetch(url);
    
    const [activeRide, setRide] = useState(null);

    useEffect(()=> {
        if(ride){
            ride.forEach(r => {
                r["s_lat_lon"] = r.startLocation.replace("&",", ");
                r["d_lat_lon"] = r.finishLocation.replace("&",", ");
            }) 
            console.log(ride)
            setRide(ride[0]);
        }

    }, [ride]);

    

    return (<Container>
        <Row className="py-3">
            <h2>{username} Ride Status</h2>
        </Row>
            { !isPending && activeRide && <Card style={{width: '25rem'}}>
                <Card.Header>Ride Status</Card.Header>
                <Card.Body>
                    
                    <Card.Title>Ride No.</Card.Title>
                    <Card.Text>{activeRide.id}</Card.Text>

                    <Card.Title>Ride Status</Card.Title>
                    <Card.Text>{activeRide.ride_status}</Card.Text>

                    <Card.Title>Date</Card.Title>
                    <Card.Text>{activeRide.date}</Card.Text>

                    <Card.Title>Estimated Arrival</Card.Title>
                    <Card.Text>{activeRide.estimatedArrival}</Card.Text>

                    <Card.Title>Start Location</Card.Title>
                    <Card.Text>{activeRide.s_lat_lon}</Card.Text>

                    <Card.Title>Destination</Card.Title>
                    <Card.Text>{activeRide.d_lat_lon}</Card.Text>

                </Card.Body>
                
                </Card>}
    </Container>  );
}
 
export default UserRideStatus;