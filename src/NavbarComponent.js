import Navbar from "react-bootstrap/Navbar";    
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setSourceMapRange } from "typescript";
import { UserContext } from "./UserContext";




const NavbarComponent = ({loggedIn, setLoggedIn}) => {

    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);

    const handleLogout = () => {
        localStorage.setItem('user', false);
        localStorage.setItem('admin', false);
        setLoggedIn(false);
        navigate("/");
        console.log("Logged Out");
        setUser(null);
        
    }

    const [homeLink, setHomeLink] = useState("/");

    useEffect(() => {
        const isAdmin = localStorage.getItem('admin');
        if(loggedIn==="true" && isAdmin==="1"){
            setHomeLink("/admin");
        }
        else if(loggedIn==="true"){
            setHomeLink("/user");
        } else{
            setHomeLink("/");
        }
    }, [loggedIn])


    const isLoggedIn = () => {
        if(loggedIn==="true"){
            return (
            <Button variant="secondary" onClick={handleLogout}>
                Logout
                </Button>);
        } else{
            return (
                <Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/signup">Signup</Nav.Link>
                </Nav>
            );
        }
    }

    const loggedInLinks = () => {
        const isAdmin = localStorage.getItem('admin');
        if(loggedIn==="true" && isAdmin==="1"){
            return (
                <Nav>
                    <Nav.Link href="/admin/avstatus">AV Statuses</Nav.Link>
                </Nav>
            );
        } 
        else if(loggedIn=="true")
        {
            return (
                <Nav className="mr-auto">
                    <Nav.Link href="/">Book Ride</Nav.Link>
                    <Nav.Link href="/">Billing</Nav.Link>
                    <Nav.Link href="/">History</Nav.Link>
                </Nav>
            );
        }
        else return;
    }


    return (
    <Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand href="/">AV Cloud</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href={homeLink}>Home</Nav.Link>
            
        </Nav>
        {loggedInLinks()}
        <Nav className="mr-auto">
            {isLoggedIn()}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    );

}
 
export default NavbarComponent;