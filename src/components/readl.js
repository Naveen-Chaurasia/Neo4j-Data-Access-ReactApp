import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Read1 from './read1';

export default function Read() {
    const [APIData, setAPIData] = useState([]);
   
   const[ShowProducts,setShowProducts]=useState(false);


    const handleClick = (id) => {

        setShowProducts=true;
        console.log("************************");

        return <Read1/>;
        
    }

    
    useEffect(() => {
        axios.get(`http://localhost:8091/category`)
            .then((response) => {
                
                console.log(response.data._embedded.category)
                setAPIData(response.data._embedded.category);
                
               
            })
    }, []);

    // const setData = (data) => {
    //     let { id, firstName, lastName, checkbox } = data;
    //     localStorage.setItem('ID', id);
    //     localStorage.setItem('First Name', firstName);
    //     localStorage.setItem('Last Name', lastName);
    //     localStorage.setItem('Checkbox Value', checkbox)
    // }

    // const getData = () => {
    //     axios.get(`http://localhost:8091/category`)
    //         .then((getData) => {
    //             setAPIData(getData.data);
    //         })
    // }

    // const onDelete = (id) => {
    //     axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
    //     .then(() => {
    //         getData();
    //     })
    // }

    return (
        <div>
            <Table className="table1" color="red">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell> Category Names</Table.HeaderCell>
                        {/* <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checkbox Value</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell> */}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                
                    {APIData.map((response) => {
                        
                        return (
                            // <Table.Row  className="tableRow"><Button onClick={() => handleClick(1)}>B</Button>{ ShowProducts && <Read1/>} {response.name}</Table.Row>
                            <Table.Row  className="tableRow"><Button>B</Button>  {response.name}<Read1 data={response._links.products.href} className="table2"/></Table.Row>
                            )

                                {/* <Table.Cell>{response}</Table.Cell> */}
                                {/* <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell> */}
                                {/* <Link to='/update'>
                                    <Table.Cell> 
                                        <Button onClick={() => setData(data)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                                </Table.Cell> */}
                            
                        
                    })}
                </Table.Body>
                
            </Table>

  
        </div>
    )
}
