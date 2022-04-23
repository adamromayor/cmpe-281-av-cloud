import { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "./UserContext";

const Home = () => {
    
    
    return ( 
        <div className="home">
            <Container className="pt-3">
                <h2>Home Page</h2>
                <p>Welcome to AV Cloud!</p>
            </Container>
        </div>
     );
}
 
export default Home