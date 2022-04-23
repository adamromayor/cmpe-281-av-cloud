import { Badge, Container, Row } from "react-bootstrap";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const AvStatuses = () => {

    const navigate = useNavigate();
    const {data:vehicles, isPending, error} = useFetch("http://localhost:5050/vehicles");
    
    const [active, setActive] = useState(0);
    const [inactive, setInactive] = useState(0);
    const [connected, setConnected] = useState(0);
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
                  variant="primary"
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
                <Row>
                    <h3>AV Statistics</h3>
                    <p>{active} of {total} vehicles are active</p>
                    <p>{inactive} of {total} vehicles are inactive</p>
                    <p>{connected} of {total} vehicles are connected</p>
                </Row>
                <Row className="py-3">
                    <h3>Registered Vehicles</h3>
                </Row>
                <div style={{ height: 400, width: '100%' }}>
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