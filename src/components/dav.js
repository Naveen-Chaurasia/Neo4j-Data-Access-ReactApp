import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

import React, { useState, useEffect } from 'react';



import axios from 'axios';

export default function Dav() {
   
  const [Da, setDa] = useState(new Set());


  // useEffect(() => {
  //   axios.get(`http://localhost:8091/category`).then((response) => {
  //     console.log(response.data._embedded.category);
  //     setDa(response.data._embedded.category);
  //   });
  // }, []);



const body = { 
  "statements": [
    {
      "statement": "match (n:Category) match (p:Products) MERGE (p)-[x:Product_of]->(c) RETURN n,p,x",
      "resultDataContents": ["row", "graph"]
    }
  ]
} ;
const headers = { 
    'Authorization': 'Basic amFrZTE6amFrZTE=',
};

  useEffect(() => {
    axios.post('http://localhost:7474/db/neo4j/tx', body, { headers }).then((response) => {
      console.log(response.data.results[0].data[0].graph.relationships);
      console.log(response.data.results[0].data[0].graph.nodes);
      //debugger;
      setDa(response.data.results[0].data[0].graph);
    });
  }, []);


  // const genRandomTree = (N = 300) => {
  //   return {
      // nodes: [...Array(N).keys()].map(i => ({
      //   id: i,
      //   icon: "https://i.imgur.com/5vyqEdE.png",
        
      // })),
  //     links: [...Array(N).keys()]
  //       .filter(id => id)
  //       .map(id => ({
  //         source: id,
  //         target: Math.round(Math.random() * (id - 1)),
  //         curvature: 0.1,
  //         color: "#FF0000"
  //       }))
  //   };
  // };





  const genRandomTree = (N = 1000) => {
    return {
     // nodes: Da.nodes,
     nodes: [...Array(N).keys()].map(i => ({
      id: Da.nodes[0].id,
      icon: "https://i.imgur.com/5vyqEdE.png",
      
    })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: Da.relationships[id].startNode,
          target: Da.relationships[id].endNode,
          curvature: 0.1,
          color: "#FF0000"
        }))
    };
  };


  // const genRandomTree = () => {
  //   return {
  //     nodes:Da.nodes,
  //     links:Da.relationships
       
  //   };
  // };


//   useEffect(() => {
//     axios.get(`http://localhost:8091/category`).then((response) => {
//       console.log(response.data._embedded.category);
//       setAPIData(response.data._embedded.category);
//     });
//   }, []);
  
    
  return (
        <div>
           bbbbbbbbbbbbbbbbbbbbbbbbbbb
            
            <ForceGraph3D
          graphData={genRandomTree(300)}
          nodeLabel="id"
          nodeAutoColorBy="group"
          linkDirectionalParticles="value"
          linkDirectionalParticleSpeed={d => d.value * 0.001}
        />
        </div>
    )
}
