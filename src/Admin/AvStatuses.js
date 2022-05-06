import { Badge, Card, Container, Row } from "react-bootstrap";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../CustomHooks/useFetch";
import DataGridWrapper from "../Components/DataGridWrapper";

const AvStatuses = () => {

    const navigate = useNavigate();
    //const {data:vehicles, isPending, error} = useFetch("/vehicles");
    const {data:vehicles, isPending, error} = useFetch("/admin/av/all");
    
    const [active, setActive] = useState(0);
    const [inactive, setInactive] = useState(0);
    const [connected, setConnected] = useState(0);
    const [deregistered, setDeregistered] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=> {
        if(vehicles){
            vehicles.AVs.forEach(vehicle => {
                
                vehicle["url"] = "/administrator/avstatus/" + vehicle.AV_ID;
                
                vehicle["lat"] = vehicle.Location ? vehicle.Location.split("&")[0] : "";
                vehicle["lon"] = vehicle.Location ? vehicle.Location.split("&")[1] : "";
                //vehicle["id"] = vehicle.AV_ID;
                
            }) 
            
            //console.log(vehicles)
            setActive(vehicles.AVs.filter((vehicle) => { return vehicle.Service_State==='Active'}).length);
            setInactive(vehicles.AVs.filter((vehicle) => { return vehicle.Service_State==='Inactive'}).length);
            setConnected(vehicles.AVs.filter((vehicle) => { return vehicle.Service_State==='Connected'}).length);
            setDeregistered(vehicles.AVs.filter((vehicle) => { return vehicle.Service_State==='Deregistered'}).length);
            setTotal(vehicles.AVs.length);
        }
    }, [vehicles]);

    const columns: GridColDef[] = [
        { field: 'AV_ID', headerName: 'ID', width: 100 },
        {
            field: 'Service_State',
            headerName: 'Service State',
            width: 150,
            renderCell: (params: GridRenderCellParams<String>) => (
                <div>
                    { params.value === "Active" && <Badge bg="primary">{params.value}</Badge>}
                    { params.value === "Connected" && <Badge bg="success">{params.value}</Badge>}
                    { params.value === "Inactive" && <Badge bg="danger">{params.value}</Badge>}
                    { params.value === "Deregistered" && <Badge bg="secondary">{params.value}</Badge>}
                </div>
                
            ),
          },
        {
          field: 'Moving_State',
          headerName: 'Moving State',
          width: 150,
          editable: false,
          
        },
        {
          field: 'userName',
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
                {isPending && !error && <p>Loading...</p>}
                {!isPending && vehicles && 
                    <DataGridWrapper 
                        rows={vehicles.AVs} 
                        columns={columns} 
                        getRowId={(row)=> row.AV_ID}
                    />
                }               
                </div>
            </Container>
            
        </div>
     );
}
 
export default AvStatuses;