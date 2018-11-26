// URL: https://beta.observablehq.com/@victoriaqiu/d3-use-the-force-directed-graph
// Title: D3 Use-The-Force-Directed Graph
// Author: victoriaqiu (@victoriaqiu)
// Version: 263
// Runtime version: 1

const m0 = {
  id: "d95a293e42d79542@263",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# D3 Use-The-Force-Directed Graph

This network of character co-occurence in _Star Wars_ is positioned by simulated forces using [d3-force](https://github.com/d3/d3-force). Based on the data from the [Star Wars social networks repo](https://github.com/evelinag/StarWars-social-network/tree/master/networks). `
)})
    },
    {
      name: "forceSimulation",
      inputs: ["d3"],
      value: (function(d3){return(
function forceSimulation(nodes, links) {
  return d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-130).distanceMin(60))
      .force("center", d3.forceCenter());
}
)})
    },
    {
      name: "chart",
      inputs: ["data","forceSimulation","d3","DOM","width","height","numScenes","color","drag"],
      value: (function(data,forceSimulation,d3,DOM,width,height,numScenes,color,drag)
{
  const links = data.links.map(d => Object.create(d));
  const nodes = data.nodes.map((d, index) => Object.create(d, { id: { value: index } }));
  console.log(links, 
              nodes);
  const simulation = forceSimulation(nodes, links).on("tick", ticked);

  const svg = d3.select(DOM.svg(width, height))
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
      .attr("r", numScenes)
      .attr("fill", color)
      .call(drag(simulation));
  
 var texts  = svg.selectAll(".texts")
      .data(nodes)
      .enter()
      .filter( d => (d.value >= 40) )
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("dx", 12)
      .attr("dy", "0.35em")
      .text( d => d.name );

  node.append("title")
      .text(d => d.name);

  function ticked() {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    
    texts
        .attr("x", d => d.x)
        .attr("y", d => d.y);
    
  }

  return svg.node();
}
)
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (function(d3){return(
d3.json("https://raw.githubusercontent.com/victoriaqiu/ids_pkg/master/user_gragh_all.json")
)})
    },
    {
      name: "height",
      value: (function(){return(
800
)})
    },
    {
      name: "color",
      value: (function()
{
  //const scale = d3.scaleOrdinal(d3.schemeCategory10);
  //return d => scale(d.value);
  return d => d.color;
}
)
    },
    {
      name: "numScenes",
      inputs: ["d3"],
      value: (function(d3)
{
  var width = d3.scaleQuantize()
    .domain([1, 190])
    .range([10, 20, 30, 35, 40, 45])
  return d => width(d.value);
}
)
    },
    {
      name: "drag",
      inputs: ["d3"],
      value: (function(d3){return(
simulation => {
  
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5")
)})
    }
  ]
};

const notebook = {
  id: "d95a293e42d79542@263",
  modules: [m0]
};

export default notebook;
