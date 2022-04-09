import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Read2(props) {
    const [APIData, setAPIData] = useState([]);
    
    useEffect(() => {
        axios.get(props.data)
            .then((response) => {
                
                console.log(response.data._embedded.productComponents)
                setAPIData(response.data._embedded.productComponents);
                
            })
    }, []);


    return (
        <div>
            <Table className="table3" color="blue">
               
                <Table.Body>
                
                    {APIData.map((response) => {
                        
                        return (
                            <Table.Row  className="tableRow1">
                                {response.name}</Table.Row>
                            )           
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
