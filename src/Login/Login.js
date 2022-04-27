//import { useContext, useState } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form"
import { Container, Row, Col, Badge } from "react-bootstrap";
//import { UserContext } from "../CustomHooks/UserContext";


const Login = ({setLoggedIn}) => {
    
    const navigate = useNavigate();

    //const {user, setUser} = useContext(UserContext);
    const [loginFailed, setLoginFailed] = useState(false)

    const invalidCombination = () => {
        if(loginFailed){
            return (<Badge className="mt-3" bg='danger'>Invalid Username or Password</Badge>);
        }
        return
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password =  e.target.password.value;
        
        const data = {userName:username, userPassword:password};
        
        
        const login = (data) => {
            fetch('http://localhost:8000/user/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                  
                if(username !== "" && data.status === 200){
                    console.log("Login Successful: " + data.userName);
                    const navigate_url = data.isAdmin ? "/admin" : "/user";


                    //setUser(data.userName);
                    
                    localStorage.setItem('user', true);
                    localStorage.setItem('username', data.userName);
                    localStorage.setItem('admin', data.isAdmin);
                    setLoggedIn(true);
                    navigate(navigate_url);
                }
                else{
                    setLoginFailed(true);
                    console.log("Login Failed");
                }
            })
            .catch((err)=>{
                console.log("ERROR: "+err.message);
            })
        }

        login(data);
    }
    
    return ( 
        <div className="login">
        
        <Container fluid>
            <Row >
                <Col md="6" className="bg-dark d-none d-lg-block" style={{"height": "100vh"}}>
                    <h2 style={{color:"white", 
                                textAlign:"center", 
                                justifyContent:"center",
                                flex: 1,
                                lineHeight: "100px"}}>Welcome to AV Cloud</h2>
                </Col>
                <Col md="4" className="m-3">
                    <Row>
                        <h2>Login Page</h2>
                    </Row>
                    <Row >
                        <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="px-5">
                            Login
                        </Button>
                    
                        </Form>
                    </Row>
                    <Row md="auto">
                    {invalidCombination()}
                    </Row>
                <Row className="mt-5">
                    <p>Don't have an account?</p><Link to="/signup">Signup here</Link>
                </Row>
                </Col>
            </Row>
        </Container>
        
            

        </div>
     );
}
 
export default Login;
