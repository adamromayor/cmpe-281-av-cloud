import useFetch from "../../CustomHooks/useFetch";
import { Container } from "react-bootstrap";
import DataGridWrapper from "../../Components/DataGridWrapper";
import { useEffect } from "react";

const ServiceRecords = ({av_id}) => {
    const url = "/av_sim/service_record/" + av_id;
    const {data:records, isPending, error} = useFetch(url);
    
    useEffect(()=>{
        console.log(url);
        if(records){
            records.items.Items.forEach((record)=>{

                const date = new Date(record.time_created);
                record.time = date.getHours()+":"+date.getMinutes();

                console.log(JSON.stringify(record));
            })
           
        }
    },[records])

    const columns: GridColDef[] = [
        //{ field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'date',
            headerName: 'Date',
            width: 110,
            editable: false,
            sortable: true
        },
        {
          field: 'time',
          headerName: 'Time Created',
          width: 150,
          editable: false,
          sortable: true
          
        },
        {
            field: 'issues',
            headerName: 'Issues',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
        },
        {
          field: 'serviced_parts',
          headerName: 'Serviced Part',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 160,
        },
        {
            field: 'techician',
            headerName: 'Technician',
            description: 'This column has a value getter and is not sortable.',
            sortable: true,
            width: 160,
          },
      ];


    return (  
        <Container className="py-3">
            <h2>Service Records</h2>
            {isPending && <p>Loading...</p>}
            {!error && records && records.status===200 && 
                <p>{records.items.Items.length} total service records.</p>
            }
            {!error && !isPending && records && records.status===200 && records.items.Count > 0 && 
                <DataGridWrapper rows={records.items.Items} columns={columns} />
            }
        </Container>
    );
}
 
export default ServiceRecords;