import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

import React, { useState, useEffect } from 'react';



import axios from 'axios';

export default function Dav() {
   
  const [Da, setDa] = useState([]);

//const [APIData, setAPIData] = useState({})

  // const  d=fetch("http://localhost:8091/category");
  // const db=d.json();
  // debugger;



  useEffect(() => {
    axios.get(`http://localhost:8091/category`).then((response) => {
      console.log(response.data._embedded.category);
      setDa(response.data._embedded.category);
    });
  }, []);


  // const d=
  // axios.get(`http://localhost:8091/category`).then((response) => {
  //   console.log( response.data._embedded.category);
  //   console.log( response.data._embedded.category.type);
  //   debugger;
  //   return response.data._embedded.category;
    
  // });





  // const genRandomTree = (N = 300) => {
  //   return {
  //     nodes: [...Array(N).keys()].map(i => ({
  //       id: i,
  //       icon: "https://i.imgur.com/5vyqEdE.png",
        
  //     })),
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




  const genRandomTree = (N = 200) => {
    return {
      nodes:Da,
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
          curvature: 0.1,
          color: "#FF0000"
        }))
    };
  };


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
          graphData={genRandomTree(2000)}
         // graphData={d}
          nodeLabel="id"
          nodeAutoColorBy="group"
          linkDirectionalParticles="value"
          linkDirectionalParticleSpeed={d => d.value * 0.001}
        />
        </div>
    )
}
