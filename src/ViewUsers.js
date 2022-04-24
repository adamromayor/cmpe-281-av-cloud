import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import useFetch from "./useFetch";


const ViewUsers = () => {

    const url = "http://localhost:8000/admin/admin/userlist"
    const {data:users, isPending, error} = useFetch(url);

    const columns: GridColDef[] = [
        //{ field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'userEmail',
            headerName: 'Email',
            width: 200,
            editable: false,
          
        },
        {
            field: 'userName',
            headerName: 'Username',
            width: 200,
            editable: false,
          
        },
        {
            field: 'isAdmin',
            headerName: 'Administrator',
            width: 150,
            editable: false,
            
        },
      ];

    return ( <div className="users">
        <Container className="mt-3">
            <Row className="mb-3">
            <h2>User Details</h2>
            </Row>
            <Row>
            <div style={{ height: 600, width: '100%' }}>
                    {users && <DataGrid
                        rows={users.users[0]}
                        columns={columns}
                        pageSize={10}
                        getRowId={(row)=> row.userName}
                        rowsPerPageOptions={[10]}
                        //checkboxSelection
                        disableSelectionOnClick
                    />}
            </div>
            </Row>
        </Container>
    </div> );
}
 
export default ViewUsers;