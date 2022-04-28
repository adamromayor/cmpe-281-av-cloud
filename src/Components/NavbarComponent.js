import Navbar from "react-bootstrap/Navbar";    
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useEffect, useState } from "react";
//import { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaCloudMoon } from "react-icons/fa";
//import { UserContext } from "../CustomHooks/UserContext";




const NavbarComponent = ({loggedIn, setLoggedIn}) => {

    const navigate = useNavigate();
    //const {setUser} = useContext(UserContext);
    const isAdmin = localStorage.getItem('admin');
    const username = localStorage.getItem('username');
    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
        console.log("Logged Out");
        //setUser(null);
        
    }

    const [homeLink, setHomeLink] = useState("/");

    useEffect(() => {
        //const isAdmin = localStorage.getItem('admin');
        if(loggedIn==="true" && isAdmin==="1"){
            setHomeLink("/administrator");
        }
        else if(loggedIn==="true"){
            const username = localStorage.getItem('username');
            setHomeLink("/"+username);
        } else{
            setHomeLink("/");
        }
    }, [loggedIn, isAdmin])



    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <Link className="text-secondary nav-link" to={homeLink}><FaCloudMoon /> AV Cloud</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to={homeLink}>Home</Link>
                    </Nav>
                    {loggedIn && isAdmin === "1" &&
                        <Nav>
                            <Link className="nav-link" to="/administrator">AV Statuses</Link>
                            <Link className="nav-link" to="/administrator/register">Register AV</Link>
                            <Link className="nav-link" to="/administrator/users">User Details</Link>
                        </Nav>
                    }

                    {loggedIn &&  isAdmin === "0" &&
                        <Nav className="mr-auto">
                            <Link className="nav-link" to={"/"+username}>Book Ride</Link>
                            <Link className="nav-link" to={"/"+username}>Billing</Link>
                            <Link className="nav-link" to={"/"+username}>History</Link>
                        </Nav>
                    }
                    <Nav className="mr-auto">
                        { !loggedIn &&
                            <>
                                <Link className="nav-link" to="/login">Login</Link>
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </>
                        }
                        {loggedIn && 
                            <NavDropdown title="Account" id="basic-nav-dropdown" className="me-3">
                                <Link className="nav-link text-secondary" to="/profile">Profile</Link>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="nav-link" onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown> 
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
 
export default NavbarComponent;