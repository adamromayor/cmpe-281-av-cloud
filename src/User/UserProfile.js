import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import useFetch from "../CustomHooks/useFetch";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
    const username = localStorage.getItem('username');
    const {data, isPending, error} = useFetch("/user/" + username);
    const [profile, setProfile] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(data){
            //console.log(JSON.stringify(data));

            const tmpProfile = data.profile;

            if(!tmpProfile.gender) tmpProfile.gender = "None";
            if(!tmpProfile.location) tmpProfile.location = "None";
            if(!tmpProfile.about) tmpProfile.about = "None";

            setProfile(tmpProfile);
        }
    }, [data])

    const handleSubmit = (e) => {
        e.preventDefault();

        var newProfile = {};
        var tmpProfile = profile;
        if(e.target.address.value){
            newProfile.address = e.target.address.value; 
            tmpProfile.location = newProfile.address;
            
        }
        if(e.target.about.value){
            newProfile.about = e.target.about.value;
            tmpProfile.about = newProfile.about; 
        }

        if(e.target.gender.value !== ""){
            newProfile.gender = e.target.gender.value;
            tmpProfile.gender = newProfile.gender; 
        }

        if(Object.keys(newProfile).length > 0){
            fetch("/user/"+username+"/update", {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProfile)
            })
            .then((res)=>res.json())
            .then((d)=> {
                setProfile(tmpProfile);
            })
            .catch((err) =>{
                console.log("Update Failed");
            })
        } else{
            console.log("Nothing to update");
        }

        handleClose();
        console.log("DATA: "+JSON.stringify([newProfile]));

    }
    return ( 
        <Container>
            <Row className="mt-3">
                <h2>Profile</h2>
            </Row>
            {!isPending && !error && profile &&
            <Row md={2}>
                <Col>
                    <Card className="mt-3">
                        <Card.Header>{profile.userName}
                            <FaEdit className="float-end" size="1.5em" onClick={handleShow} style={{cursor:"pointer"}}/>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Email</Card.Title>
                            <Card.Text>{profile.userEmail}</Card.Text>
                            <Card.Title>Gender</Card.Title>
                            <Card.Text>{profile.gender}</Card.Text>

                            <Card.Title>Location</Card.Title>
                            <Card.Text>{profile.location}</Card.Text>
                            
                            <Card.Title>About</Card.Title>
                           <Card.Text>{profile.about}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            }
            { !isPending && !error && profile && 
            <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="address" 
                                placeholder={profile.location==="None" ? "Enter Address" : profile.location} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>About</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}  
                                name="about" 
                                placeholder={profile.about === "None" ? 
                                                "Write a little something about you..." : 
                                                profile.about}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender">
                                <option value="">Select One...</option>
                                <option>Female</option>
                                <option>Male</option>
                                <option>Non-binary</option>
                                <option>Transgender</option>
                                <option>Intersex</option>
                                <option>I prefer not to say</option>
                            </Form.Select>

                        </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                            Save Changes
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
            }
        </Container>
     );
}
 
export default UserProfile;