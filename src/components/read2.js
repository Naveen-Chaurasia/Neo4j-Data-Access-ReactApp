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
                            <Table.Row  className="tableRow2">
                               <b>{response.name} </b>>>  cu-{response.cu_content}  al-{response.al_content} steel-{response.steel_content} plastic-{response.plastic_content} flat_Panel_glass-{response.flat_Panel_glass} li_ion_Battery_Content-{response.li_ion_Battery_Content} crt_glass-{response.crt_glass} pcb_content-{response.pcb_content} other_glass-{response.other_glass} other_metal_content-{response.other_metal_content} other_contents-{response.other_contents} total_mass-{response.total_mass}</Table.Row>
                            )           
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}
