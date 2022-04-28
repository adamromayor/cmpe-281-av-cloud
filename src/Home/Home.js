import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FullColumnComponent from "../Components/FullColumnComponent";

const Home = () => {
    
    const navigate = useNavigate();

    return ( 
        <div className="home">
            <Container fluid>
            <Row >
                <FullColumnComponent title="Welcome to AV Cloud" />
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