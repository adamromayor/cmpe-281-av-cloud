import { useState } from "react";
import {Badge, Button, Col, Container, Form, Row} from "react-bootstrap";
import FullColumnComponent from "../Components/FullColumnComponent";

const RegisterAv = () => {   
    
    const [success, setSuccess] = useState(null);
    const [newId, setId] = useState(null);
    const username = localStorage.getItem("username");

    const registrationSuccess = () => {
        if(success === true && newId){
            return (<Badge className="mt-3 bg-success">Registration Successful: AV ID {newId}</Badge>);
        } else if (success === false){
            return (<Badge className="mt-3 bg-danger">Registration Failed</Badge>);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const make = e.target.make.value;
        const model = e.target.model.value;
        const year =  e.target.year.value;
        const license = e.target.license.value;

        const av = {
            av_year: year,
            av_make: make,
            av_model: model,
            av_license: license
        }
        
        fetch('/admin/av/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(av)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("DATA")
            console.log(data);
            if(data.status === 200){
                console.log("Registration Successful: " + JSON.stringify(data));
                setSuccess(true);
                setId(data.New_AV_ID)
            
                // Update AV status to Connected and Parked
                const av_state = {
                    av_id: data.New_AV_ID,
                    service_state: "Connected",
                    moving_state: "Parked",
                    av_location: "37.3346653&-121.8753298"
                }

                fetch('/admin/' + username +'/av/info',{
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(av_state)
                })
                .then((r)=> r.json())
                .then((d)=>{
                    if(d.status===200)
                        console.log("State Updated Successfully")
                    else
                        console.log("Failed to Update AV State")
                })
                // END OF AV STATUS UPDATE
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
                <FullColumnComponent title="Welcome to AV Cloud" />
                <Col md="4" className="m-3">
                    <Row>
                        <h2>Register New Vehicle</h2>
                    </Row>
                    
                    <Row >
                        <Form onSubmit={handleSubmit} id="registration">
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
                        {success && 
                            <Button 
                                variant="secondary" 
                                className="ms-3"
                                onClick={() => { 
                                    window.location.reload(false);
                                }}
                                >
                                Register Another Vehicle
                            </Button>
                        }

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