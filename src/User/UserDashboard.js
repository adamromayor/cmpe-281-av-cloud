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
        {title:"Booking", description:"Book a Ride", url:"/"+username},
        {title:"Payment", description:"Manage Payments", url:"/"+username},
        {title:"History", description:"View Ride History", url:"/"+username}
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
            url: "/"+username+"/ride"
        }

        if(data && data.status === 200){
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
                        return(<DashboardCardComponent key={card.title} card={card} />);
                    })
                }

                </Row>
            </Container>
        </div>
    );
}
 
export default UserDashboard