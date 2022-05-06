import { Col, Container, Form, Row, Button, Badge } from "react-bootstrap";
import FullColumnComponent from "../Components/FullColumnComponent";

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookRide = () => {

    const [address, setAddress] = useState("");
    const [dest, setDest] = useState("");
    const [cooridnates, setCoordinates] = useState(null);
    const [destCoords, setDestCoords] = useState(null);
    const [success, setSuccess] = useState(false);
    const [bookingFailed, setBookingFailed] = useState(false);
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(address === "" || dest === ""){
            setSuccess(false);
            setBookingFailed(true);
        }
        else{
            // api request to book ride
            const url = "/user/"+username+"/booking";

            const startString = cooridnates.lat +"&" +cooridnates.lng;
            const destString = destCoords.lat +"&" +destCoords.lng;

            const data = {
                start_location : startString,
                finish_location : destString
            }

            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(data.status === 200){
                    console.log("Ride booked")
                    setSuccess(true);
                    setBookingFailed(false);
                
                // Call /start-ride api
                
                    const ride_data = {
                        ride_id: data.Ride_ID,
                        av_id: data.Booked_AV_ID,
                        start: startString,
                        destination: destString,
                        username: username
                    }

                    fetch("/start-ride", {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(ride_data)
                    })
                    .then((res) => res.json())
                    .then((d) => {
                        console.log(d);
                    });

                }
                else{
                    setSuccess(false);
                    setBookingFailed(true);
                }
            })
            .catch((err)=>{
                console.log("ERROR: "+err.message);
            })
        }
    }

    const handleSelect = async value =>{
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0])
        setCoordinates(latLng);
        setAddress(value);
    }

    const handleSelectDestination = async value =>{
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0])
        setDestCoords(latLng);
        setDest(value);
    }

    return ( 
    <div>
        <Container fluid>
            <Row>
            <FullColumnComponent title="AV Cloud" />
            <Col md="4" className="m-3">
                <h2>Book a Ride</h2>
                <Row className="mt-3"><p>Where is your pickup location?</p></Row>
                <Row>
                    <PlacesAutocomplete 
                        value={address} 
                        onChange={setAddress} 
                        onSelect={handleSelect}>
                        {({getInputProps, suggestions, getSuggestionItemProps, loading})=> (
                        <div>
                            <Form.Control {...getInputProps({placeholder:"Type Address"})}/>
                            <div>
                                {loading && <div>Loading</div>}
                                {!loading && suggestions.map((suggestion)=> {
                                    const style = { 
                                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                    }
                                    return (
                                        <div {...getSuggestionItemProps(suggestion,{style})} key={suggestion.placeId}>
                                            {suggestion.description}
                                        </div>
                                        )
                                })}
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
                </Row>
                <Row className="mt-3"><p>Where is your destination?</p></Row>
                <PlacesAutocomplete 
                    value={dest} 
                    onChange={setDest} 
                    onSelect={handleSelectDestination}>
                    {({getInputProps, suggestions, getSuggestionItemProps, loading})=> (
                    <div>
                        <Form.Control {...getInputProps({placeholder:"Type Address"})}/>
                        <div>
                            {loading && <div>Loading</div>}
                            {!loading && suggestions.map((suggestion)=> {
                               // console.log(suggestion.placeId);

                                const style = { 
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                }
                                return (
                                    <div {...getSuggestionItemProps(suggestion,{style})} key={suggestion.placeId}>
                                        {suggestion.description}
                                    </div>
                                    )
                            })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>
                
                <Row>
                    <Button onClick={handleSubmit} className="mt-3" variant="secondary" disabled={success}>
                            Book Trip
                    </Button>
                </Row>
                
                {success && <Row className="mt-3">
                    <p>Trip booked successfully from {address} to {dest}</p>
                </Row>}
                {success && 
                    <Row className="mt-3">
                        <Button variant="success" 
                                onClick={()=>{navigate("/"+username+"/ride")}}>
                            Track Ride Status
                        </Button>
                    </Row>
                }


                { bookingFailed && 
                    <Badge className="bg-danger mt-3">Booking Failed</Badge>
                }
            </Col>
            </Row>
        </Container>
    </div>
     );
}
 
export default BookRide;