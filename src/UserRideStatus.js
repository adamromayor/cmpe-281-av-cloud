import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MapContainer from "./MapContainer";
import useFetch from "./useFetch";
import { UserContext } from "./UserContext";

const UserRideStatus = () => {
    
    const { username } = useParams();
    const url = "http://localhost:5050/rideTable?ride_status=in-progress&username=" + username
    const {data:ride, isPending, error} = useFetch(url);
    
    const avUrl = "http://localhost:5050/vehicles?username=" + username;
    const {data:av, avIsPending, averror} = useFetch(avUrl);

    const [activeRide, setRide] = useState(null);
    const [latLng, setLatLng] = useState(null);
    
    useEffect(()=> {
        if(ride){
            ride.forEach(r => {
                r["s_lat_lon"] = r.startLocation.replace("&",", ");
                r["d_lat_lon"] = r.finishLocation.replace("&",", ");
            }) 
            console.log(ride)
            setRide(ride[0]);
        }

        if(av){
            console.log("AV DATA: " + JSON.stringify(av));
            const lat = parseFloat(av[0].location.split("&")[0]);
            const lng = parseFloat(av[0].location.split("&")[1]);
            setLatLng({
                lat: lat,
                lng: lng
            });
        }


    }, [ride, av]);

    

    return (<Container>
        <Row className="py-3">
            <h2>{username} Ride Status</h2>
        </Row>

        <Row>
            <Col>
                { !isPending && activeRide && 
                    <Card >
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
                    </Card.Body>
                    
                    </Card>}
                    
            </Col>
            <Col>
            { latLng && activeRide && <Card>
                    <Card.Header>Vehicle Location</Card.Header>
                    <Card.Body>
                        <Card.Title>Current Location</Card.Title>
                        <Card.Text>{latLng.lat +", "+latLng.lng}</Card.Text>
                       
                        <Card.Title>Start Location</Card.Title>
                        <Card.Text>{activeRide.s_lat_lon}</Card.Text>

                        <Card.Title>Destination</Card.Title>
                        <Card.Text>{activeRide.d_lat_lon}</Card.Text>

                    </Card.Body>
                    
                    </Card>}
            </Col>
        </Row>
        <Row className="mt-5">
            <h2>Vehicle Location</h2>
        </Row>
        <Row>
            <Col className="mt-3">
                    {latLng && <MapContainer lat={latLng.lat} lng={latLng.lng}/>}
            </Col>
        </Row>
    </Container>  );
}
 
export default UserRideStatus;