import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form"
import { Container, Row, Col, Badge } from "react-bootstrap";
import useFetch from "./useFetch";
import { UserContext } from "./UserContext";


const Login = ({setLoggedIn}) => {
    
    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext);
    const [loginFailed, setLoginFailed] = useState(false)

    const invalidCombination = () => {
        if(loginFailed){
            return (<Badge bg='danger'>Invalid Username or Password</Badge>);
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
                  
                if(data.status === 200){
                    console.log("Login Successful: " + data.userName);
                    const navigate_url = data.isAdmin ? "/admin" : "/user";


                    setUser(data.userName);
                    
                    localStorage.setItem('user', true);
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
        
        <Container>
            <Row className="py-3">
                <Col><h2>Login Page</h2></Col>
            </Row>
            <Row md="auto">
                <Col>
                    <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    </Form>
            </Col>
            </Row>
            <Row className="pt-2">
                <Col>
                {invalidCombination()}
                </Col>
            </Row>
        </Container>
        
            

        </div>
     );
}
 
export default Login;
