import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
//import { useContext, useState } from "react";
//import { UserContext } from "../CustomHooks/UserContext";
import { Badge } from "react-bootstrap";
import FullColumnComponent from "../Components/FullColumnComponent";


const Signup = ({setLoggedIn}) => {
    const navigate = useNavigate();
    const [signupFailed, setSignupFailed] = useState(false)

    //const {user, setUser} = useContext(UserContext);

    const [signupError, setSignupError] = useState(null);
    const invalidUsername = () => {
        if(signupFailed){
            return (<Badge className="mt-3" bg='danger'>{signupError}</Badge>);
        }
        return;
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password =  e.target.password.value;
        const isAdmin = e.target.isAdmin.checked;
        

        const data = {userEmail: email, userName:username, userPassword:password};
        

        const url = isAdmin ? "/admin/signup" : "/user/signup"

        
        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
              
            if(data.status === 200){
                console.log("Signup Successful: " + data.userName);
                const navigate_url = isAdmin ? "/administrator" : "/"+data.userName;


                //setUser(data.userName);
                localStorage.setItem('user', true);
                localStorage.setItem('username', data.userName);
                
                localStorage.setItem('admin', isAdmin ? "1" : "0");
                
                setLoggedIn(true);
                navigate(navigate_url);
            }
            else{
                setSignupFailed(true);
                setSignupError(data.message);
                console.log("Signup Failed: " + data.message);
            }
        })
        .catch((err)=>{
            console.log("ERROR: "+err.message);
        })
    }

    return ( 
        <div className="signup">
            
            <Container fluid>
            <Row>
                <FullColumnComponent title="Welcome to AV Cloud" />
                <Col md="4" className="m-3">
                    <h2>Signup</h2>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter Email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin Signup" name="isAdmin"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="px-5">
                        Signup
                    </Button>
                    </Form>
                    {invalidUsername()}
                    <Row className="mt-5">
                    <p>Already have an account?</p><Link to="/login">Login here</Link>
                    </Row>
                
                </Col>
        </Row>
        </Container>
        </div>
     );
}
 
export default Signup;
