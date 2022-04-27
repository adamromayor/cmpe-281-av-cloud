import { Container, Row } from "react-bootstrap";
import DashboardCardComponent from "../Components/DashboardCardComponent";

const AdminDashboard = () => {
    
    const user = localStorage.getItem("username");

    const cardArray = [
        {title:"Vehicle Status", description:"View Status of All Vehicles", url:"/admin/avstatus"},
        {title:"User Information", description:"View All Users", url:"/admin/users"},
        {title:"Register AV", description:"Register a new vehicle", url:"/admin/register"}
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
                        return(<DashboardCardComponent card={card} />)
                    })
                }
                </Row>
            </Container>
        </div>  );
}
 
export default AdminDashboard;