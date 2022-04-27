import { Badge, Card, Container, Row } from "react-bootstrap";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../CustomHooks/useFetch";

const AvStatuses = () => {

    const navigate = useNavigate();
    const {data:vehicles, isPending, error} = useFetch("http://localhost:5050/vehicles");
    
    const [active, setActive] = useState(0);
    const [inactive, setInactive] = useState(0);
    const [connected, setConnected] = useState(0);
    const [deregistered, setDeregistered] = useState(0);
    const [total, setTotal] = useState(0);


    useEffect(()=> {
        if(vehicles){
            vehicles.forEach(vehicle => {
                vehicle["url"] = "/admin/avstatus/" + vehicle.id;
                vehicle["lat"] = vehicle.location.split("&")[0];
                vehicle["lon"] = vehicle.location.split("&")[1];
            }) 

        setActive(vehicles.filter((vehicle) => { return vehicle.serviceState==='active'}).length);
        setInactive(vehicles.filter((vehicle) => { return vehicle.serviceState==='inactive'}).length);
        setConnected(vehicles.filter((vehicle) => { return vehicle.serviceState==='connected'}).length);
        setDeregistered(vehicles.filter((vehicle) => { return vehicle.serviceState==='deregistered'}).length);
        setTotal(vehicles.length);
        }
    }, [vehicles]);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'serviceState',
            headerName: 'Service State',
            width: 150,
            renderCell: (params: GridRenderCellParams<String>) => (
                <div>
                    { params.value === "active" && <Badge bg="primary">{params.value}</Badge>}
                    { params.value === "connected" && <Badge bg="success">{params.value}</Badge>}
                    { params.value === "inactive" && <Badge bg="danger">{params.value}</Badge>}
                    { params.value === "deregistered" && <Badge bg="secondary">{params.value}</Badge>}
                </div>
                
            ),
          },
        {
          field: 'movingState',
          headerName: 'Moving State',
          width: 150,
          editable: false,
          
        },
        {
          field: 'username',
          headerName: 'Username',
          width: 110,
          editable: false,
          
        },
        {
          field: 'lat',
          headerName: 'Latitude',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          
        },
        {
            field: 'lon',
            headerName: 'Longitude',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            
          },
        {
            field: 'url',
            headerName: 'More Details',
            width: 160,
            renderCell: (params: GridRenderCellParams<String>) => (
                <Button
                  variant="info"
                  size="small"
                  onClick={()=>{
                      navigate(params.value);
                  }}
                >
                  View Details
                </Button>
            ),
          },
      ];


    

    return ( 
        <div className="av">
            <Container className="py-3">
                <Row className="pb-3">
                    <h2>All Registered Vehicles</h2>
                </Row>
                
                <Card className="my-3" style={{width: '25rem'}}>
                    <Card.Header>AV Statistics</Card.Header>    
                    <Card.Body>
                        <Card.Text>{active} of {total} vehicles are active</Card.Text>
                        <Card.Text>{inactive} of {total} vehicles are inactive</Card.Text>
                        <Card.Text>{connected} of {total} vehicles are connected</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>{deregistered} of {total} vehicles are deregistered</Card.Text>
                    </Card.Footer>
                </Card>
                
                <Row className="py-3">
                    <h3>Registered Vehicles</h3>
                </Row>
                <div style={{ height: 600, width: '100%' }}>
                    {vehicles && <DataGrid
                        rows={vehicles}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        //checkboxSelection
                        disableSelectionOnClick
                    />}
                </div>
            </Container>
            
        </div>
     );
}
 
export default AvStatuses;