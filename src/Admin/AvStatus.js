import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react";
import useFetch from "../CustomHooks/useFetch";
import { Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RideStatistics from "./Components/RideStatistics";
import ServiceRecords from "./Components/ServiceRecords";
import MapContainer from "../Components/MapContainer";

const AvStatus = () => {
    const {id} = useParams();
    const {data:vehicles, isPending, error} = useFetch("/admin/av/"+id);
    const username = localStorage.getItem('username');
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const [av, setAV] = useState(null);
    useEffect(()=>{
        if(vehicles){ 
            const Location = vehicles.AV[0].Location;
            const lat = Location ? parseFloat(Location.split("&")[0]) : "";
            const lng = Location ? parseFloat(Location.split("&")[1]) : "";
            
            setAV(vehicles.AV[0]);
            
            setLat(lat);
            setLng(lng);
            //console.log(vehicles)
            //console.log("LOCATION: "+Location+ " "+lat + " " + lng);
        }
    }, [vehicles, id])

    const putState = (newState) =>{
        const data = {
            av_id: id,
            service_state: newState,
            moving_state:  newState === "Deregistered" ? "" : av.Moving_State,
            userName:      newState === "Deregistered" ? "" : av.userName,
            av_location:   newState === "Deregistered" ? "" : av.Location
        };
        //console.log(data);
        const requestOptions = {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(data)
        };

        fetch("/admin/"+username+"/av/info", requestOptions)
            .then(response => response.json())
            .then(d => {
                console.log(d);
                setAV({
                    AV_ID: id,
                    Moving_State: av.Moving_State,
                    Service_State:newState,
                    Location:av.Location,
                    userName:av.userName
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const changeState = () =>{

        if(!error && av && av.Service_State === "Connected"){
            return (
                <Card.Footer className="text-center">
                    <Button variant="secondary" onClick={()=>{putState("Inactive")}}>
                        Change Service State to Inactive
                    </Button>
                    <Button variant="danger" className="m-3" onClick={()=>{putState("Deregistered")}}>
                        Deregister Vehicle
                    </Button>
                </Card.Footer>
                );    
        } 
        else if(!error && av && av.Service_State === "Inactive"){
            return (
                <Card.Footer className="text-center">
                    <Button variant="success" onClick={()=> {putState("Connected")}}>
                        Change Service State to Connected
                    </Button>
                    <Button variant="danger" className="m-3" onClick={()=>{putState("Deregistered")}}>
                        Deregister Vehicle
                    </Button>
                </Card.Footer>
                );    
        }
        
    }

    return ( 
    <div>
        <Container className="py-3">
            <h2>Status and Statistics of AV {id}</h2>
            {isPending && !error && <p>Loading...</p>}
           {!isPending && !error && av && <Card className="my-3" style={{width: '25rem'}}>
            <Card.Header>AV ID {id}</Card.Header>
                <Card.Body >
                    {av.Service_State === "Active" && 
                        <Card.Title>Current Passenger</Card.Title>}
                    {av.Service_State === "Active" && 
                        <Card.Text>{av.userName}</Card.Text>}

                    {av.Service_State !== "Deregistered" && 
                    <>
                    <Card.Title>Latitude</Card.Title>
                    <Card.Text>{lat}</Card.Text>

                    <Card.Title>Longitude</Card.Title>
                    <Card.Text>{lng}</Card.Text>

                    <Card.Title>Moving State</Card.Title>
                    <Card.Text>{av.Moving_State}</Card.Text></>}
                    
                    <Card.Title>Service State</Card.Title>
                    <Card.Text>{av.Service_State}</Card.Text>
                </Card.Body>
                {changeState()}
            </Card>} 
            <Row>
                <RideStatistics av_id={id} />
            </Row>
            <Row>
                <ServiceRecords av_id={id} />
            </Row>
             
            {!isPending && !error && av && av.Service_State !== "Deregistered" && 
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