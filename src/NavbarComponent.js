import Navbar from "react-bootstrap/Navbar";    
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setSourceMapRange } from "typescript";
import { UserContext } from "./UserContext";




const NavbarComponent = ({loggedIn, setLoggedIn}) => {

    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const isAdmin = localStorage.getItem('admin');

    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        navigate("/");
        console.log("Logged Out");
        setUser(null);
        
    }

    const [homeLink, setHomeLink] = useState("/");

    useEffect(() => {
        //const isAdmin = localStorage.getItem('admin');
        if(loggedIn==="true" && isAdmin==="1"){
            setHomeLink("/admin");
        }
        else if(loggedIn==="true"){
            setHomeLink("/user");
        } else{
            setHomeLink("/");
        }
    }, [loggedIn])



    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href={homeLink}>AV Cloud</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link className="nav-link" to={homeLink}>Home</Link>
                
            </Nav>
            {loggedIn && isAdmin === "1" &&
                    <Nav>
                        <Link className="nav-link" to="/admin/avstatus">AV Statuses</Link>
                        <Link className="nav-link" to="/admin/register">Register AV</Link>
                        {/*<Link className="nav-link" to="/">Deregister AV</Link>*/}
                        <Link className="nav-link" to="/admin/users">User Details</Link>

                    </Nav>
                }

                {loggedIn &&  isAdmin === "0" &&
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/user">Book Ride</Link>
                        <Link className="nav-link" to="/user">Billing</Link>
                        <Link className="nav-link" to="/user">History</Link>
                    </Nav>
                }
            <Nav className="mr-auto">
            
                

                { !loggedIn &&
                    <Nav>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/signup">Signup</Link>
                    </Nav>
                }
                
                {loggedIn && <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item><Link className="nav-link" to="/">Profile</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>{loggedIn && <Button variant="secondary" onClick={handleLogout}>
                    Logout
                </Button>}</NavDropdown.Item>
                </NavDropdown> }
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );

}
 
export default NavbarComponent;