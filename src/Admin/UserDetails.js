import { GridColDef } from "@mui/x-data-grid";
import { Container, Row } from "react-bootstrap";
import DataGridWrapper from "../Components/DataGridWrapper";
import useFetch from "../CustomHooks/useFetch";


const UserDetails = () => {

    const username = localStorage.getItem('username');
    const url = "/admin/" + username + "/userlist"
    const {data:users, isPending, error} = useFetch(url);

    const columns: GridColDef[] = [
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
            { !isPending && !error && users && 
                <DataGridWrapper rows={users.users[0]} columns={columns} getRowId={(row)=>row.userName} />
            }
            </Row>
        </Container>
    </div> );
}
 
export default UserDetails;