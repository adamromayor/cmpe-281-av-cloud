import { Col } from "react-bootstrap";
import { FaCloudMoon } from "react-icons/fa";

const FullColumnComponent = ({title}) => {
    return ( 
        <Col md="6" className="bg-dark d-none d-lg-block" style={{"height": "100vh"}}>
            <h2 style={{color:"white", 
                textAlign:"center", 
                justifyContent:"center",
                flex: 1,
                lineHeight: "100px"}}><FaCloudMoon/> {title}</h2>
        </Col> );
}
 
export default FullColumnComponent;