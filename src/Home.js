import { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Home = () => {
    
    const navigate = useNavigate();

    return ( 
        <div className="home">
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
                    <Row><h2>Create an Account</h2></Row>
                    <Button className="mt-3 px-5" 
                            variant="info"
                            onClick = {()=>{navigate("/signup")}}>
                                Signup Here
                    </Button>
                    
                    <Row className="mt-5"><h2>Existing Account</h2></Row>
                    <Button className="mt-3 px-5" 
                            variant="secondary"
                            onClick = {()=>{navigate("/login")}}>
                            Login Here
                    </Button>

                </Col>
            </Row>
            </Container>
        </div>
     );
}
 
export default Home