import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MapContainer from "../Components/MapContainer";
import useFetch from "../CustomHooks/useFetch";


const UserRideStatus = () => {
    
    const { username } = useParams();
    const url = "/user/" + username + "/booking/status";
    const {data:ride, isPending, error} = useFetch(url);
    const [loc, setLoc] = useState(null)
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [startLoc, setStart] = useState(null)
    const [destLoc, setDest] = useState(null)
    const [eta, setEta] = useState(null)

    useEffect(()=> {
        if(ride && ride.status===200){
            console.log(ride);
            console.log(username);
            ride.AV_Status.loc = ride.AV_Status.location.replace("&",", ");
            
            setLoc(ride.AV_Status.loc);
            setLat(ride.AV_Status.loc.split(", ")[0]);
            setLng(ride.AV_Status.loc.split(", ")[1]);
            
            const start = ride.AV_Status.start_location;
            const dest = ride.AV_Status.finish_lcation;

            const eta = ride.AV_Status.estimated_arrival;
            
            setEta(eta ? eta : "No ETA")
            setStart(start ? start.replace("&", ", ") : "No Start");
            setDest(dest ? dest.replace("&",", ") : "No Destination");
            //console.log("LOCATION: ", lat,lng)
        }

    }, [ride, loc]);

    

    return (<Container>
        <Row className="py-3">
            <h2>{username} Ride Status</h2>
        </Row>

        <Row>
            <Col>
                { !isPending && ride && ride.status === 200 && 
                    <Card >
                    <Card.Header>Ride Status</Card.Header>
                    <Card.Body>
                        
                        <Card.Title>Ride No.</Card.Title>
                        <Card.Text>{ride.AV_Status.Ride_ID}</Card.Text>

                        <Card.Title>AV Moving State</Card.Title>
                        <Card.Text>{ride.AV_Status.moving_state}</Card.Text>

                        <Card.Title>Estimated Arrival</Card.Title>
                        <Card.Text>{eta}</Card.Text>
                    </Card.Body>
                    
                    </Card>}
                    
            </Col>
            <Col>
            { !isPending && !error && ride && ride.status===200 &&
            
            <Card>
                    <Card.Header>Vehicle Location</Card.Header>
                    <Card.Body>
                        <Card.Title>Current Location</Card.Title>
                        <Card.Text>{loc}</Card.Text>
                       
                        <Card.Title>Start Location</Card.Title>
                        <Card.Text>{startLoc}</Card.Text>

                        <Card.Title>Destination</Card.Title>
                        <Card.Text>{destLoc}</Card.Text>

                    </Card.Body>
                    
                    </Card>
            }
            </Col>
        </Row>
        <Row className="mt-5">
            <h2>Vehicle Location</h2>
        </Row>
        <Row>
            <Col className="mt-3">
                    {lat && lng && <MapContainer lat={lat} lng={lng}/>}
            </Col>
        </Row>
    </Container>  );
}
 
export default UserRideStatus;