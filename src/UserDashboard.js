import { useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const UserDashboard = () => {
    const user = localStorage.getItem('username')
    const navigate = useNavigate();

    return ( 
        <div className="user">
            <Container>
                <Row>
                <h2>User Dashboard</h2>
                <p>Welcome {user}</p>
                </Row>
                <Button variant="secondary" onClick={()=>{
                    navigate("/user/ride/"+user);
                }}>
                View Ride Status
                </Button>
            </Container>
        </div>
    );
}
 
export default UserDashboard