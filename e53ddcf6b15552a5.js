// URL: https://beta.observablehq.com/d/e53ddcf6b15552a5
// Title: The accumulating count of all users in Yelp since 2004.
// Author: victoriaqiu (@victoriaqiu)
// Version: 238
// Runtime version: 1

const m0 = {
  id: "e53ddcf6b15552a5@238",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# The accumulating count of all users in Yelp since 2004.

This figure show a steady increase of the number of Users in Yelp.

Powered by Observalble`
)})
    },
    {
      name: "viewof layout",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`<form>
  <label style="margin-right:0.5em;"><input type=radio name=radio value="stacked" checked> Stacked</label>
  <label style="margin-right:0.5em;"><input type=radio name=radio value="grouped"> Grouped</label>
</form>`;
  form.oninput = () => form.value = form.radio.value;
  form.onchange = () => { // Safari…
    form.value = form.radio.value;
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = form.radio.value;
  setTimeout(() => {
    form.value = form.radio.value = "grouped";
    form.dispatchEvent(new CustomEvent("input"));
  }, 3000);
  return form;
}
)
    },
    {
      name: "layout",
      inputs: ["Generators","viewof layout"],
      value: (G, _) => G.input(_)
    },
    {
      name: "color",
      value: (function()
{
  //const scale = d3.scaleOrdinal(d3.schemeCategory10);
  //return d => scale(d.value);
  return "#f1c40f";
}
)
    },
    {
      name: "chart",
      inputs: ["d3","DOM","width","height","y01z","color","x","margin","xAxis","y","yMax","n","y1Max"],
      value: (function(d3,DOM,width,height,y01z,color,x,margin,xAxis,y,yMax,n,y1Max)
{
  const svg = d3.select(DOM.svg(width, height));

  const rect = svg.selectAll("g")
    .data(y01z)
    .enter().append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", height - margin.bottom)
      .attr("width", x.bandwidth())
      .attr("height", 0);

  svg.append("g")
      .call(xAxis);

  function transitionGrouped() {
    y.domain([0, yMax]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("x", (d, i) => x(i) + x.bandwidth() / n * d[2])
        .attr("width", x.bandwidth() / n)
      .transition()
        .attr("y", d => y(d[1] - d[0]))
        .attr("height", d => y(0) - y(d[1] - d[0]));
  }

  function transitionStacked() {
    y.domain([0, y1Max]);

    rect.transition()
        .duration(500)
        .delay((d, i) => i * 20)
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
      .transition()
        .attr("x", (d, i) => x(i))
        .attr("width", x.bandwidth());
  }

  function update(layout) {
    if (layout === "stacked") transitionStacked();
    else transitionGrouped();
  }

  return Object.assign(svg.node(), {update});
}
)
    },
    {
      inputs: ["chart","layout"],
      value: (function(chart,layout){return(
chart.update(layout)
)})
    },
    {
      name: "xz",
      inputs: ["d3","m"],
      value: (function(d3,m){return(
d3.range(m)
)})
    },
    {
      name: "yz",
      value: (function(){return(
[[1222, 2535, 3957, 5601, 7260, 8666, 10120, 11569, 13073, 20387, 27193, 34776, 41188, 46470, 52852, 53390, 69365, 83641, 99890, 114848, 130813, 147463, 165358, 184017, 199701, 214503, 227959, 241496, 243546, 245509, 247710, 249897, 252187, 254795, 257991, 261188, 264194, 267017, 270267, 273382, 288867, 302980, 320373, 336874, 356950, 377058, 400426, 422015, 439708, 458086, 474830, 491655, 495915, 499950, 504285, 509330, 514421, 519855, 525559, 532266, 538242, 543485, 548276, 553571, 553620, 553627, 553651, 572909, 590657, 610593, 628908, 647615, 666753, 688201, 708605, 725558, 746077, 762924, 778817, 786226, 792982, 800615, 807508, 814569, 823422, 834866, 845631, 855071, 863648, 872208, 882178, 882203, 882234, 882301, 882379, 882453, 882511, 882606, 882725, 882817, 882898, 882991, 883166, 901650, 918724, 936563, 953802, 971262, 988445, 1005184, 1019872, 1032675, 1044814, 1054861, 1065936, 1078144, 1090750, 1104199, 1117155, 1130761, 1144671, 1160324, 1174891, 1187692, 1201374, 1214770, 1227515, 1227790, 1228070, 1228418, 1228767, 1229066, 1229435, 1229880, 1230623, 1231293, 1231972, 1232545, 1233295, 1245403, 1255877, 1266378, 1276308, 1286139, 1295577, 1304961, 1313438, 1320650, 1327524, 1333685, 1340014, 1354178, 1367059, 1381441, 1394815, 1408486, 1423392, 1439387, 1454382, 1469938, 1486147, 1500333, 1514999, 1516090, 1517046, 1518144] ]
)})
    },
    {
      name: "y01z",
      inputs: ["d3","n","yz"],
      value: (function(d3,n,yz){return(
d3.stack()
    .keys(d3.range(n))
  (d3.transpose(yz)) // stacked yz
  .map((data, i) => data.map(([y0, y1]) => [y0, y1, i]))
)})
    },
    {
      name: "yMax",
      inputs: ["d3","yz"],
      value: (function(d3,yz){return(
d3.max(yz, y => d3.max(y))
)})
    },
    {
      name: "y1Max",
      inputs: ["d3","y01z"],
      value: (function(d3,y01z){return(
d3.max(y01z, y => d3.max(y, d => d[1]))
)})
    },
    {
      name: "x",
      inputs: ["d3","xz","margin","width"],
      value: (function(d3,xz,margin,width){return(
d3.scaleBand()
    .domain(xz)
    .rangeRound([margin.left, width - margin.right])
    .padding(0.08)
)})
    },
    {
      name: "y",
      inputs: ["d3","y1Max","height","margin"],
      value: (function(d3,y1Max,height,margin){return(
d3.scaleLinear()
    .domain([0, y1Max])
    .range([height - margin.bottom, margin.top])
)})
    },
    {
      name: "z",
      inputs: ["d3","n"],
      value: (function(d3,n){return(
d3.scaleSequential(d3.interpolateBlues)
    .domain([-0.5 * n, 1.5 * n])
)})
    },
    {
      name: "xAxis",
      inputs: ["height","margin","d3","x"],
      value: (function(height,margin,d3,x){return(
svg => svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(() => ""))
)})
    },
    {
      name: "n",
      value: (function(){return(
1
)})
    },
    {
      name: "m",
      value: (function(){return(
166
)})
    },
    {
      name: "height",
      value: (function(){return(
500
)})
    },
    {
      name: "margin",
      value: (function(){return(
{top: 0, right: 0, bottom: 10, left: 0}
)})
    },
    {
      name: "bumps",
      value: (function(){return(
function bumps(m) {
  const values = [];

  // Initialize with uniform random values in [0.1, 0.2).
  for (let i = 0; i < m; ++i) {
    values[i] = 0.1 + 0.1 * Math.random();
  }

  // Add five random bumps.
  for (let j = 0; j < 5; ++j) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());
    for (let i = 0; i < m; i++) {
      const w = (i / m - y) * z;
      values[i] += x * Math.exp(-w * w);
    }
  }

  // Ensure all values are positive.
  for (let i = 0; i < m; ++i) {
    values[i] = Math.max(0, values[i]);
  }

  return values;
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
  id: "e53ddcf6b15552a5@238",
  modules: [m0]
};

export default notebook;
