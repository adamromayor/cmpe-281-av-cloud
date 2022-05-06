import useFetch from "../../CustomHooks/useFetch";
import { Badge, Button, Container, Form, Modal } from "react-bootstrap";
import DataGridWrapper from "../../Components/DataGridWrapper";
import { useEffect, useState } from "react";


const ServiceRecords = ({av_id, service_state}) => {
    const url = "/av_sim/service_record/" + av_id;
    const {data:records, isPending, error} = useFetch(url);
    const [show, setShow] = useState(null)
    const [showFillOutMessage, setShowFillOutMessage] = useState(false);
    const [ showError, setShowError] = useState(false);

    const handleClose = () => {
        setShow(false)
        setShowFillOutMessage(false);
        setShowError(false);
    }
    const handleShow = () => setShow(true)
    

    useEffect(()=>{
        if(records){
            records.items.Items.forEach((record)=>{

                const date = new Date(record.time_created);
                record.time = date.toLocaleTimeString('en-US', {
                    // en-US can be set to 'default' to use user's browser settings
                    hour: '2-digit',
                    minute: '2-digit',
                  });
            })
           
        }
    },[records])

    const handleSubmit = (e) => {

        e.preventDefault();
        const tech = e.target.tech.value;
        const parts = e.target.parts.value;
        const issues = e.target.issues.value;
        const date = new Date().toLocaleString().split(',')[0];

        const data = {
            date:date,
            serviced_parts: parts,
            av_id: parseInt(av_id),
            issues: issues,
            techician: tech
        }

        console.log(JSON.stringify(data));

        if(!tech || !parts || !issues){
            console.log("Failed")
            setShowFillOutMessage(true);
        }
        else{
            
            fetch('/av_sim/service_record', {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("DATA")
                console.log(data);
                if(data.status === 200){
                    console.log("Service Record Created: " + JSON.stringify(data));
                }
            })
            .catch((err)=>{
                console.log("ERROR: "+err.message);
                setShowError(true);
            })
            window.location.reload(false);
            handleClose();
        }
    }

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
            {service_state==="Inactive" && 
                <Button className="mb-3" onClick={handleShow} variant="secondary">
                    Create New Service Record
                </Button>
            }
            {!error && !isPending && records && records.status===200 && records.items.Count > 0 && 
                <DataGridWrapper rows={records.items.Items} columns={columns} />
            }

            { !isPending && !error && 
            <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                <Modal.Title>Service Record for AV {av_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Technician</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="tech" 
                                placeholder="Technician Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Issues</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3}  
                                name="issues" 
                                placeholder="Describe the issue with vehicle."
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Serviced Parts</Form.Label>
                            <Form.Control 
                                type="text"   
                                name="parts" 
                                placeholder="Parts Serviced"
                            />
                        </Form.Group>
                        {showFillOutMessage && 
                            <Badge className="bg-danger">Please fill out all fields.</Badge>
                        }
                        {showError && 
                            <Badge className="bg-danger">Something went wrong...</Badge>
                        }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                            Create Record
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
            }
        </Container>
    );
}
 
export default ServiceRecords;