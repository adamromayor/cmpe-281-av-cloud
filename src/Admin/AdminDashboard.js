import { Container, Row } from "react-bootstrap";
import DashboardCardComponent from "../Components/DashboardCardComponent";

const AdminDashboard = () => {
    
    const user = localStorage.getItem("username");

    const cardArray = [
        {title:"Profile", description:"View Profile", url:"/profile"},
        {title:"Vehicle Status", description:"View Status of All Vehicles", url:"/administrator/avstatus"},
        {title:"User Information", description:"View All Users", url:"/administrator/users"},
        {title:"Register AV", description:"Register a new vehicle", url:"/administrator/register"},
        {title:"Ride Status", description:"View Status of In Progress Rides", url:"/administrator/rides"}
    ]

    return (
        <div className="admin">
            <Container className="mt-3">
                <Row>
                <h2>Administrator</h2>
                <p>Welcome {user}</p>
                </Row>
                <Row xs={1} md={3}  className="mt-3">
                {
                    cardArray.map((card)=>{
                        return(<DashboardCardComponent key={card.title} card={card} />)
                    })
                }
                </Row>
            </Container>
        </div>  );
}
 
export default AdminDashboard;