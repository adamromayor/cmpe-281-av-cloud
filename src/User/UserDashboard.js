import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DashboardCardComponent from "../Components/DashboardCardComponent";
import useFetch from "../CustomHooks/useFetch";

const UserDashboard = () => {
    const username = localStorage.getItem("username");
    const url = "/user/" + username + "/booking/status";
    const {data, isPending, error} = useFetch(url);

    const cardArray = [
        {title:"Profile", description:"View Profile", url:"/profile"},
        {title:"Payment", description:"Manage Payments", url:"/"+username+"/invoices"},
        {title:"History", description:"View Ride History", url:"/"+username+"/history"}
    ]


    useEffect(()=>{
        if(data){
            console.log(data)
        }
    }, [data])


    const showRideStatusButton = () => {
        const card = {
            title:"Ride Status",
            description:"Track Vehicle",
            url: "/"+username+"/ride"
        }

        if(data && data.status === 200){
            return (<DashboardCardComponent card={card} / >);
        }

        else return;
    }
    
    const showBookingButton = () => {
        const card = {
            title:"Booking",
            description:"Book a Ride",
            url: "/"+username+"/book"
        }

        if(data && data.status !== 200){
            console.log(data)
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
               {!isPending && !error &&  <Row xs={1} md={2} >
                    {showRideStatusButton()}
                    {showBookingButton()}
                {
                    cardArray.map((card)=>{
                        return(<DashboardCardComponent key={card.title} card={card} />);
                    })
                }
                </Row>}
            </Container>
        </div>
    );
}
 
export default UserDashboard