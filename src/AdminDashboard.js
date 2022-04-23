import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Container, Row, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const AdminDashboard = () => {

    const navigate = useNavigate();
    
    const {user} = useContext(UserContext);

    return (
        <div className="admin">
            <Container>
                <Row>
                <h2>Administrator</h2>
                <p>Welcome {user}</p>
                </Row>
                <Button variant="secondary" onClick={()=>{
                    navigate("/admin/avstatus");
                }}>
                View Status of All Vehicles
                </Button>
            </Container>
        </div>  );
}
 
export default AdminDashboard;