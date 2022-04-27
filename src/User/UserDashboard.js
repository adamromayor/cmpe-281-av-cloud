import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DashboardCardComponent from "../Components/DashboardCardComponent";
import useFetch from "../CustomHooks/useFetch";

const UserDashboard = () => {
    const username = localStorage.getItem("username");
    const url = "http://localhost:5050/rideTable?ride_status=in-progress&username=" + username;
    const {data, isPending, error} = useFetch(url);

    const cardArray = [
        {title:"Booking", description:"Book a Ride", url:"/user"},
        {title:"Payment", description:"Manage Payments", url:"/user"},
        {title:"History", description:"View Ride History", url:"/user"}
    ]



    useEffect(()=>{
        if(data){
            //console.log(data)
        }
    }, [data])


    const showRideStatusButton = () => {
        const card = {
            title:"Ride Status",
            description:"Track Vehicle",
            url: "/user/ride/"+username
        }

        if(data && data.length > 0){
            return (<DashboardCardComponent card={card} / >);
        }

        else return;
    }


    return ( 
        <div className="user">
            <Container className="py-3">
                <Row >
                <h2>User Dashboard</h2>
                <p>Welcome {username}</p>
                </Row>
                <Row xs={1} md={2} >
                    {showRideStatusButton()}

                {
                    cardArray.map((card)=>{
                        return(<DashboardCardComponent card={card} />);
                    })
                }

                </Row>
            </Container>
        </div>
    );
}
 
export default UserDashboard