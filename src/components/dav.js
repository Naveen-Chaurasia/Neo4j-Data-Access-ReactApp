import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Dav() {
  const [Nodes1, setNodes1] = useState([]);
  const [Nodes2, setNodes2] = useState([]);
  const [Nodes, setNodes] = useState([]);
  const [NodeR, setNodeR] = useState([]);
  const [Node3, setNode3] = useState([]);
  const body = {
    statements: [
      {
        statement://"match (p:Products) match(pc:ProductComponents) MERGE (pc)-[y:component_of]->(p) RETURN p,pc,y LIMIT 10",
       "match (n:Category) match (p:Products) MERGE (p)-[x:Product_of]->(c) RETURN n,p,x",
        resultDataContents: ["row", "graph"],
      },
    ],
  };
  const headers = {
    Authorization: "Basic amFrZTE6amFrZTE=",
  };

  useEffect(() => {
    axios
      .post("http://localhost:7474/db/neo4j/tx", body, { headers })
      .then((response) => {
        console.log(
          response.data.results[0].data[0].graph.relationships[0].startNode
        );
        console.log(
          typeof parseInt(
            response.data.results[0].data[0].graph.relationships[0].startNode
          )
        );
        console.log(response.data.results[0].data[0].graph.nodes[0]);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&");

      setNodes1 ( response.data.results[0].data.slice(0, 5).map((i)=>({nodes:i.graph.nodes[0]})));
      setNodes2 ( response.data.results[0].data.slice(0, 5).map((i)=>({nodes:i.graph.nodes[1]})));
      setNodes( [...Nodes1, ...Nodes2]);
      
      setNodeR( response.data.results[0].data.slice(0, 5).map((i)=>({nodesr:i.graph.relationships[0]})));
      setNode3(NodeR.concat(Nodes1));
      console.log("**********************");
      console.log(response.data.results[0].data.slice(0, 5));
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      //  setNodes(response.data.results[0].data[0].graph.nodes);
        //setNodeR(response.data.results[0].data[0].graph.relationships);
     //debugger;
      });
  }, []);

  const gData = {
    //nodes: Da.map((node, id) => ({ id, node })),
    nodes: [...Nodes1, ...Nodes2].map((noder) => ({id: noder.nodes.id })),
    links: NodeR.filter((noder) => noder).map((noder) => ({
      source: noder.nodesr.startNode,
      target: noder.nodesr.endNode,
    })),
  };

 

  return (
    <div>
      <ForceGraph3D
        graphData={gData}
        nodeLabel="id"
        nodeAutoColorBy="group"
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
      />
    </div>
  );
}



 // const gData = {
  //   nodes: Da.nodes,
  //   links: Da.relationships
  // };

  // const N = 10;
  // const gData = {
  //   nodes: [...Array(N).keys()].map(i => ({ id:i})),
  //   links: [...Array(N).keys()]
  //     .filter(id => id)
  //     .map(id => ({
  //       source: id,
  //       target: Math.round(Math.random() * (id-1))
  //     }))
  // };

  // const gData = {
  //   nodes: [...Array(N).keys()].map(i => ({ id:Da.nodes[i].id })),
  //   links: [...Array(N).keys()]
  //     .filter(id => id)
  //     .map(id => ({
  //      // source: (Da.relationships[id].startNode),
  //       source: id,
  //       //target: (Da.relationships[id].endNode)
  //       target: Math.round(Math.random() * (id-1))
  //     }))
  // };

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

// const genRandomTree = (N = 1000) => {
//   return {
//    // nodes: Da.nodes,
//    nodes: [...Array(N).keys()].map(i => ({
//     id: parseInt(Da.nodes[i].id),
//     icon: "https://i.imgur.com/5vyqEdE.png",

//   })),
//     links: [...Array(N).keys()]
//       .filter(id => id)
//       .map(id => ({
//         source: parseInt(Da.relationships[id].startNode),
//         target: parseInt(Da.relationships[id].endNode),
//         curvature: 0.1,
//         color: "#FF0000"
//       }))
//   };
// };

// const gData = {
//   nodes: [...Array(N).keys()].map(i => ({ id: i })),
//   links: [...Array(N).keys()]
//     .filter(id => id)
//     .map(id => ({
//       source: id,
//       target: Math.round(Math.random() * (id-1))
//     }))
// };
// "match (p:Products) match(pc:ProductComponents) MERGE (pc)-[y:component_of]->(p) RETURN p,pc,y LIMIT 5",
// "match (n:Category) match (p:Products) match(pc:ProductComponents) MERGE (p)-[x:Product_of]->(c) MERGE (pc)-[y:component_of]->(p) RETURN n,p,pc,x,y LIMIT 10",