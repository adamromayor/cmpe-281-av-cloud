import { useEffect } from "react";
import { Badge, Button, Container, Row } from "react-bootstrap"
import DataGridWrapper from "../Components/DataGridWrapper";
import useFetch from "../CustomHooks/useFetch";

const InvoiceHistory = () => {
    const username = localStorage.getItem("username");

    const url = "/user/"+username+"/invoice/history"
    
    const {data, isPending, error} = useFetch(url);

    useEffect(()=>{
        if(data && data.status===200 && data.invoices){
            console.log(data)
            data.invoices.forEach(invoice =>{
                invoice.action = invoice.Status === "outstanding" ? invoice.Invoice_ID : null;
            })
        }

    }, [data])

    const handlePayment = (id) =>{
        console.log("ID",id)

        const payUrl = "/user/" + username + "/invoice"

        const payload = {
            invoice_ID : id
        }

        fetch(payUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((d) => {
            console.log(d);    
            if(d.status === 200){
                console.log("Payment Successful");
                data.invoices.forEach(invoice =>{
                    if(invoice.Invoice_ID === id){
                        invoice.Status = "paid";
                        invoice.action = null;
                    }
                })
            }
            else{
                console.log("Payment Failed")
            }
        })
        .catch((err)=>{
            console.log("ERROR: "+err.message);
        })
    }
    const columns: GridColDef[] = [
        //{ field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'Invoice_ID',
            headerName: 'Invoice ID',
            width: 100,
            editable: false,
        },
        {
            field: 'Date',
            headerName: 'Date',
            width: 200,
            editable: false,  
        },
        {
            field: 'Status',
            headerName: 'Payment Status',
            width: 150,
            editable: false,
        },
        {
            field: 'Cost',
            headerName: 'Cost',
            width: 150,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: GridRenderCellParams<String>) => (
                <div>
                    
                    { params.value && 
                    <Button variant="success" 
                            onClick={()=>{handlePayment(params.value)}}>
                                Pay Now
                    </Button>}
                    { !params.value && 
                    <Button variant="secondary"
                            disabled={true}>
                                Paid in Full
                    </Button>}
                </div>
            ),
        },
      ];

    return ( 
        <Container className="py-3">
                <Row >
                <h2>Payment History</h2>
                </Row>
                
                <Row>
                { !isPending && !error && data && data.status === 200 && data.invoices && 
                <DataGridWrapper rows={data.invoices} columns={columns} getRowId={(row)=>row.Invoice_ID} />
                }
                { !isPending && !error && data && data.status === 200 && !data.invoices &&
                <p>{data.message}</p>
                }
                {!isPending && error && <p>Error while fetching data.</p>}
            </Row>
        </Container>
     );
}
 
export default InvoiceHistory;