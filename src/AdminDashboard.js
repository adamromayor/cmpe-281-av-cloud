import { Button, Col } from "react-bootstrap";
import { Container, Row, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const navigate = useNavigate();
    
    const user = localStorage.getItem("username");

    return (
        <div className="admin">
            <Container className="mt-3">
                <Row>
                <h2>Administrator</h2>
                <p>Welcome {user}</p>
                </Row>
                <Row className="mt-3">
                    <Col>                       
                        <Card 
                            onClick={()=>{navigate("/admin/avstatus")}}
                            style={{cursor:"pointer"}}>
                            <Card.Header >Vehicle Status</Card.Header>
                            <Card.Body>
                                <Card.Text>View Status of All Vehicles</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card 
                            onClick={()=>{navigate("/admin/users")}}
                            style={{cursor:"pointer"}}>
                            <Card.Header>User Information</Card.Header>
                            <Card.Body>
                                <Card.Text>View All Users</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card 
                            onClick={()=>{navigate("/admin/register")}}
                            style={{cursor:"pointer"}}>
                            <Card.Header>Register AV</Card.Header>
                            <Card.Body>
                                <Card.Text>Register a new vehicle</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>  );
}
 
export default AdminDashboard;