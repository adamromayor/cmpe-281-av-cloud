import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RideStatistics from "./RideStatistics";
import ServiceRecords from "./ServiceRecords";
import MapContainer from "./MapContainer";

const AvStatus = () => {
    const {id} = useParams();
    const {data:vehicles, isPending, error} = useFetch("http://localhost:5050/vehicles");
    const [av, setAv] = useState(null);
    
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    useEffect(()=>{
        if(vehicles){
            const tmpAv = vehicles.filter((v)=>{
                return v.id === id;});

            setAv(vehicles.filter((v)=>{
                return v.id === id;
            }));

            if(tmpAv){
                console.log("AV DATA: " + JSON.stringify(tmpAv));
                const lat = parseFloat(tmpAv[0].location.split("&")[0]);
                const lng = parseFloat(tmpAv[0].location.split("&")[1]);
          
                setLat(lat);
                setLng(lng);
                console.log(lat + " " + lng)
            }
        }
    }, [vehicles])

    const putState = (newState) =>{
        const data = [{
            serviceState: newState,
            movingState: newState ==="deregistered" ? "" : av[0].movingState,
            username: newState === "deregistered" ? "" : av[0].username,
            location: newState === "deregistered" ? "" : av[0].location
        }];
        //console.log(data);
        const requestOptions = {
            method : "PUT",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(data[0])
        };

        fetch("http://localhost:5050/vehicles/"+id, requestOptions)
            .then(response => response.json())
            .then(d => {
                console.log(d);
                setAv(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const changeState = () =>{

        if(av && av[0].serviceState === "connected"){
            return (
                <Card.Footer className="text-center">
                    <Button variant="secondary" onClick={()=>{putState("inactive")}}>
                        Change Service State to Inactive
                    </Button>
                    <Button variant="danger" className="m-3" onClick={()=>{putState("deregistered")}}>
                        Deregister Vehicle
                    </Button>
                </Card.Footer>
                );    
        } 
        else if(av && av[0].serviceState === "inactive"){
            return (
                <Card.Footer className="text-center">
                    <Button variant="success" onClick={()=> {putState("connected")}}>
                        Change Service State to Connected
                    </Button>
                    <Button variant="danger" className="m-3" onClick={()=>{putState("deregistered")}}>
                        Deregister Vehicle
                    </Button>
                </Card.Footer>
                );    
        }
        
    }

    return ( 
    <div>
        <Container className="py-3">
            <h2>Status and Statistics of {id}</h2>
           {!isPending && av && <Card className="my-3" style={{width: '25rem'}}>
            <Card.Header>{id}</Card.Header>
                <Card.Body >
                    { av[0].serviceState === "active" && 
                        <Card.Title>Current Passenger</Card.Title>}
                    {av[0].serviceState === "active" && 
                        <Card.Text>{av[0].username}</Card.Text>}

                    {av[0].serviceState !== "deregistered" && 
                    <>
                    <Card.Title>Latitude</Card.Title>
                    <Card.Text>{av[0].location.split("&")[0]}</Card.Text>

                    <Card.Title>Longitude</Card.Title>
                    <Card.Text>{av[0].location.split("&")[1]}</Card.Text>

                    <Card.Title>Moving State</Card.Title>
                    <Card.Text>{av[0].movingState}</Card.Text></>}
                    
                    <Card.Title>Service State</Card.Title>
                    <Card.Text>{av[0].serviceState}</Card.Text>
                </Card.Body>
                {changeState()}
            </Card>} 
            <Row>
                <RideStatistics av_id={id} />
            </Row>
            <Row>
            <ServiceRecords av_id={id} />
            </Row>
            {av && av[0].serviceState !== "deregistered" && 
            <Row className="mt-5">
            <h2>Vehicle Location</h2>
            <Col className="mt-3">
                    {lat && lng && <MapContainer lat={lat} lng={lng}/>}
            </Col>
            </Row>}
        </Container>
    </div>
    );
}
 
export default AvStatus;