import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SpriteText from 'three-spritetext';
import THREE from 'three-spritetext';
<script src="//unpkg.com/three-spritetext"></script>
export default function Dav() {
  const [Nodes1, setNodes1] = useState([]);
  const [Nodes2, setNodes2] = useState([]);
  const [Nodes, setNodes] = useState([]);
  const [NodeR1, setNodeR1] = useState([]);
  const [NodeR2, setNodeR2] = useState([]);
  const [Nodes3, setNodes3] = useState([]);
  const body = {
    statements: [
      {
        statement://"match (p:Products) match(pc:ProductComponents) MERGE (pc)-[y:component_of]->(p) RETURN p,pc,y LIMIT 10",
      // "match (n:Category) match (p:Products) MERGE (p)-[x:Product_of]->(c) RETURN n,p,x",
     // "match (n:Category) match (p:Products) match(pc:ProductComponents) MERGE (p)-[x:Product_of]->(c) MERGE (pc)-[y:component_of]->(p) RETURN n,p,pc,x,y",  
     "LOAD CSV WITH HEADERS  FROM 'file:///main1.csv' AS line WITH DISTINCT line MERGE (c:Category{name: line.`Category`}) MERGE (p:Products{name:line.`Product name `}) MERGE (p)-[x:Product_of]->(c) CREATE (pc:ProductComponents{name:line.`Component `,Al_content:line.`Aluminium `,Cu_content:line.`Copper `,Steel_content:line.`Steel `,Plastic_content:line.`Plastic `,Li_ion_Battery_Content:line.`Li_ion battery`,PCB_content:line.`PCB `,Flat_Panel_glass:line.`Flat panel glass`,CRT_glass:line.`CRT glass `,other_glass:line.`Other glass`,other_metal_content:line.`Other metals`,other_contents:line.`Others`,total_mass:line.`Total mass (g)`}) MERGE (pc)-[y:component_of]->(p) return p,pc,c,x,y",
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
        // console.log(
        //   response.data.results[0].data[0].graph.relationships[0].startNode
        // );
        // console.log(
        //   typeof parseInt(
        //     response.data.results[0].data[0].graph.relationships[0].startNode
        //   )
        // );
        // console.log(response.data.results[0].data[0].graph.nodes[0]);
        // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&");

      setNodes1 ( response.data.results[0].data.map((i)=>({nodes:i.graph.nodes[0]})));
      setNodes2 ( response.data.results[0].data.map((i)=>({nodes:i.graph.nodes[1]})));
      setNodes3 ( response.data.results[0].data.map((i)=>({nodes:i.graph.nodes[2]})));
      setNodes( [...Nodes1, ...Nodes2]);
      
      setNodeR1( response.data.results[0].data.map((i)=>({nodesr:i.graph.relationships[0]})));
      setNodeR2( response.data.results[0].data.map((i)=>({nodesr:i.graph.relationships[1]})));
     // setNode3(NodeR1.concat(Nodes2));
      // console.log("**********************");
      // console.log(response.data.results[0].data.slice(0, 5));
      // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      //  setNodes(response.data.results[0].data[0].graph.nodes);
        //setNodeR(response.data.results[0].data[0].graph.relationships);
    // debugger;
      });
  }, []);
  const imgs = ['cat.jpg', 'dog.jpg', 'eagle.jpg', 'elephant.jpg', 'grasshopper.jpg', 'octopus.jpg', 'owl.jpg', 'panda.jpg', 'squirrel.jpg', 'tiger.jpg', 'whale.jpg'];
  const gData = {
    //nodes: Da.map((node, id) => ({ id, node })),
    nodes: [...Nodes1, ...Nodes2,...Nodes3].map((noder) => ({id: noder.nodes.id,name:noder.nodes.properties.name,type:noder.nodes.labels[0] })),
    links:[...NodeR1, ...NodeR2].filter((noder) => noder).map((noder) => ({
      source: noder.nodesr.startNode,
      target: noder.nodesr.endNode,
    })),
  };

  const GROUPS = 12;

  return (
    <div>
      
      <ForceGraph2D
          graphData={gData}
          nodeLabel="name"
          nodeAutoColorBy="type"
          linkWidth={2} 
          glScale={100}

          nodeThreeObject={({ img }) => {
            const imgTexture = new THREE.TextureLoader().load(`./imgs/${img}`);
            const material = new THREE.SpriteMaterial({ map: imgTexture });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(12, 12);
  
            return sprite;
          }}
        />,

       {/* <ForceGraph3D
        graphData={gData}
        nodeLabel="name"
      nodeAutoColorBy={"type"}
        nodeAutoColorBy={"type"}
        linkAutoColorBy={d => gData.nodes[d.source].id%GROUPS}
        linkWidth={2} 
      /> */}
    </div>
  );
}



    {/* <ForceGraph3D
        graphData={gData}
        nodeLabel="id"
        nodeAutoColorBy="group"
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
      /> */}


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