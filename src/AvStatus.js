import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container"
import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RideStatistics from "./RideStatistics";
import ServiceRecords from "./ServiceRecords";

const AvStatus = () => {
    const {id} = useParams();
    const {data:vehicles, isPending, error} = useFetch("http://localhost:5050/vehicles");
    const [av, setAv] = useState(null);
    
    


    useEffect(()=>{
        if(vehicles){
            setAv(vehicles.filter((v)=>{
                return v.id === id;
            }));
            if(av)console.log(av[0])
        }
    }, [vehicles])

    const putState = (newState) =>{
        const data = [{
            serviceState: newState,
            movingState: av[0].movingState,
            username: av[0].username,
            location: av[0].location
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
                    <Button variant="danger" onClick={()=>{putState("inactive")}}>
                        Change Service State to Inactive
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

                    <Card.Title>Latitude</Card.Title>
                    <Card.Text>{av[0].location.split("&")[0]}</Card.Text>

                    <Card.Title>Longitude</Card.Title>
                    <Card.Text>{av[0].location.split("&")[1]}</Card.Text>

                    <Card.Title>Moving State</Card.Title>
                    <Card.Text>{av[0].movingState}</Card.Text>
                    
                    <Card.Title>Service State</Card.Title>
                    <Card.Text>{av[0].serviceState}</Card.Text>
                </Card.Body>
                {changeState()}
            </Card>}
            
            <RideStatistics av_id={id} />
            <ServiceRecords av_id={id} />

        </Container>
    </div>
    );
}
 
export default AvStatus;