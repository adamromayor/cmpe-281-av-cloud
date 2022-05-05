import { Container, Row } from "react-bootstrap";
import RidesInProgress from "./Components/RidesInProgress";

const RideStatuses = () => {
    return ( 
    <div className="av">
        <Container className="py-3">
            <Row className="pb-3">
                <h2>All In-Progress Rides</h2>
            </Row>
            <RidesInProgress />
        </Container>
        
    </div>
    );
}
 
export default RideStatuses;