import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardCardComponent = ({card}) => {
    const navigate = useNavigate();
    
    return ( 
        
        <Col>
        <Card className="mt-3"
            onClick={()=>{ navigate(card.url)}}
            style={{cursor:"pointer"}}>
            <Card.Header>{card.title}</Card.Header>
            <Card.Body >
                <Card.Text>{card.description}</Card.Text>
            </Card.Body>
        </Card>
        </Col>
     );
}
 
export default DashboardCardComponent;