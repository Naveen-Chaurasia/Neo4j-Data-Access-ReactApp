import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Read2 from './read2';

export default function Read1(props) {
    const [APIData, setAPIData] = useState([]);
    const [ShowProductsComponents, setShowProductsComponents] = useState(false);

    var handleClick = () => {
        if(ShowProductsComponents==false)
        {
            setShowProductsComponents(true);
        }
        else{
            setShowProductsComponents(false);    
        }
      };
    
    useEffect(() => {
        axios.get(props.data)
            .then((response) => {
                
                console.log(response.data._embedded.products)
                setAPIData(response.data._embedded.products);
                
            })
    }, []);


    return (
        <div>
            <Table className="table3" color="blue">
               
                <Table.Body>
                
                    {APIData.map((response) => {
                        
                        return (
                            <div className="div1">
                            <Table.Row  className="tableRow1">
                            <button onClick={handleClick}>    {response.name}  </button> </Table.Row>
                            {ShowProductsComponents && <Read2 data={response._links.productComponents.href}/>}
                                </div>
                            )
                                 
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
