import { useContext, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const UserDashboard = () => {
    const username = localStorage.getItem("username");
    const url = "http://localhost:5050/rideTable?ride_status=in-progress&username=" + username;
    const navigate = useNavigate();
    const {data, isPending, error} = useFetch(url);

    
    useEffect(()=>{
        if(data){
            console.log(data)
        }
    }, [data])


    const showRideStatusButton = () => {
        if(data && data.length > 0){
            return (
                <Col>
                <Card 
                    onClick={()=>{ navigate("/user/ride/"+username)}}
                    style={{cursor:"pointer"}}>
                    <Card.Header>Ride Status</Card.Header>
                    <Card.Body>
                        <Card.Text>Track Vehicle</Card.Text>
                    </Card.Body>
                </Card>
            </Col>);
        }

        else return;
    }


    return ( 
        <div className="user">
            <Container className="py-3">
                <Row>
                <h2>User Dashboard</h2>
                <p>Welcome {username}</p>
                </Row>
                <Row md="6">
                {showRideStatusButton()}
                </Row>
            </Container>
        </div>
    );
}
 
export default UserDashboard