import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Read1 from "./read1";

export default function Read() {
  const [APIData, setAPIData] = useState([]);

  const [ShowProducts, setShowProducts] = useState(false);

  var handleClick = () => {
    if(ShowProducts==false)
    {
    setShowProducts(true);
    }
    else{
        setShowProducts(false);
    }

  };

  useEffect(() => {
    axios.get(`http://localhost:8091/category`).then((response) => {
      console.log(response.data._embedded.category);
      setAPIData(response.data._embedded.category);
    });
  }, []);

  return (
    <div>
      <Table className="table1" color="red">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> Category Names</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((response) => {
            return (
              <div>
             <Table.Row className="tableRow" >
                <Button onClick={handleClick} className="button1"><div2 className="div2">--></div2></Button> {response.name}
              </Table.Row>
              {ShowProducts && <Read1 data={response._links.products.href}/>}
             </div>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
