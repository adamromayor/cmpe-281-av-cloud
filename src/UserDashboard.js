import { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "./UserContext";

const UserDashboard = () => {
    const {user} = useContext(UserContext);
    return ( 
        <div className="user">
            <Container className="py-3">
                <h2>User Dashboard</h2>
                <p>Welcome {user}!</p>
            </Container>
        </div>
    );
}
 
export default UserDashboard