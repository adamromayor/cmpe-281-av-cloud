import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Signup = () => {
    const handleSubmit = (e) => {
        
        e.preventDefault();
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password =  e.target.password.value;
        
        const data = {email: email, userName:username, userPassword:password};
        
        console.log(JSON.stringify(data));
     
    }

    return ( 
        <div className="signup">
            
            <Container>
            <Row className="py-3">
                <Col><h2>Signup</h2></Col>
            </Row>
            <Row md="auto">
                <Col>
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
                    <Button variant="primary" type="submit">
                        Signup
                    </Button>
                    </Form>
            </Col>
            </Row>
            <Row className="pt-2">
                <Col>
                {/*invalidCombination()*/}
                </Col>
            </Row>
        </Container>
        </div>
     );
}
 
export default Signup;
