import { useEffect, useState } from "react";
import {Badge, Button, Col, Container, Form, Row} from "react-bootstrap";
import useFetch from "../CustomHooks/useFetch";

const RegisterAv = () => {   
    const {data:vehicles, isPending, error} = useFetch("http://localhost:5050/vehicles");
    const [nextID, setID] = useState();
    const [success, setSuccess] = useState(null);


    useEffect(()=>{
        
        if(vehicles){
             
            var tmpArray = [];
            vehicles.forEach(element => {
                tmpArray.push(element.id);
            });
            tmpArray.sort();
            tmpArray.sort((a, b) => a.length - b.length);
            const lastID = tmpArray[tmpArray.length - 1];
            const id = "av-id-" + (parseInt(lastID.split("-")[2]) + 1)
            setID(id);
            console.log(id);
        }
    }, [vehicles])

    const registrationSuccess = () => {
        if(success === true){
            return (<Badge className="mt-3 bg-success">Registration Successful: {nextID}</Badge>);
        } else if (success === false){
            return (<Badge className="mt-3 bg-danger">Registration Failed</Badge>);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //const make = e.target.make.value;
        //const model = e.target.model.value;
        //const year =  e.target.year.value;
        //const license = e.target.license.value;
        //const status = "connected";
        

        const av = {
            id:nextID,
            serviceState:"connected",
            movingState: "stopped",
            location: "pending",
            username: ""
        }
        
        fetch('http://localhost:5050/vehicles', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(av)
        })
        .then((res) => res.json())
        .then((data) => {
              
            if(data.status === 200 || data.id === nextID){
                console.log("Registration Successful: " + JSON.stringify(data));

                setSuccess(true);
            }
            else{
                console.log("Register Failed: " + JSON.stringify(data));
                setSuccess(false);
            }
        })
        .catch((err)=>{
            console.log("ERROR: "+err.message);
            setSuccess(false);
        })
    }

    return ( <div className="registerav">
        <Container fluid>
            <Row >
                <Col md="6" className="bg-dark d-none d-lg-block" style={{"height": "100vh"}}>
                    <h2 style={{color:"white", 
                                textAlign:"center", 
                                justifyContent:"center",
                                flex: 1,
                                lineHeight: "100px"}}>Welcome to AV Cloud</h2>
                </Col>
                <Col md="4" className="m-3">
                    <Row>
                        <h2>Register New Vehicle</h2>
                    </Row>
                    
                    <Row >
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" name="make" placeholder="Enter Vehicle Make" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" placeholder="Enter Vehicle Model" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" pattern="^[12][0-9]{3}$" name="year" placeholder="Enter Vehicle Year, e.g 2003" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>License Plate</Form.Label>
                            <Form.Control type="text" name="license" placeholder="Enter Vehicle License Plate" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mileage</Form.Label>
                            <Form.Control type="text" pattern="^[0-9]*$" name="mile" placeholder="Enter Vehicle Mileage" />
                        </Form.Group>


                        {!success && <Button variant="secondary" type="submit" className="px-5">
                            Submit
                        </Button>}

                        {success && <Button variant="secondary" type="submit" className="px-5 disabled">
                            Submit
                        </Button>}

                        </Form>
                        {registrationSuccess()}
                    </Row>
                    <Row md="auto">
                    
                    </Row>
                </Col>
            </Row>
        </Container>
    </div> );
}
 
export default RegisterAv;