import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Dav() {
  const [Da, setDa] = useState([]);
  const [NodeR, setNodeR] = useState([]);
  const body = {
    statements: [
      {
        statement:
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
        setDa(response.data.results[0].data[0].graph.nodes);
        setNodeR(response.data.results[0].data[0].graph.relationships);
      });
  }, []);

  const gData = {
    //nodes: Da.map((node, id) => ({ id, node })),
    nodes: Da.map((noder) => ({id: noder.id })),
    links: NodeR.filter((noder) => noder).map((noder) => ({
      source: noder.startNode,
      target: noder.endNode,
    })),
  };

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
