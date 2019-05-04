
// dkcira, April 2019
// For Trilogy class demo
// based on https://observablehq.com/@harrystevens/introducing-d3-regression
function doLinearRegression(dataLinear, theDomain){
  linearRegression = d3.regressionLinear()
  .x(d => d.x)
  .y(d => d.y)
  .domain(theDomain);
  
  var svg = d3.select("body").select("svg");
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;
  var theMargins = {top: 100, right: 100, bottom: 100, left: 100};
  var visibleHeight = windowHeight - theMargins.top - theMargins.bottom;
  var visibleWidth = windowWidth - theMargins.left - theMargins.right;

  var svg = d3.select("body").append("svg")
        .attr("height", windowHeight)
        .attr("width", windowWidth);

  const g = svg.append("g").attr("transform", `translate(${theMargins.left}, ${theMargins.top})`);

  var xScaleLinear = d3.scaleLinear()
        .domain([0, d3.max(dataLinear, d => d.x)])
        .range([0, visibleWidth]);
  var yScaleLinear = d3.scaleLinear()
        .domain([0, d3.max(dataLinear, d => d.y)])
        .range([visibleHeight, 0]);

  var xAxis = d3.axisBottom(xScaleLinear);  
  var yAxis = d3.axisLeft(yScaleLinear);
  
  g.append("g")
        .attr("transform", `translate(0, ${visibleHeight})`)
        .call(xAxis)
  g.append("g")
        .call(yAxis);

  g.selectAll("circle")
    .data(dataLinear)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", d => xScaleLinear(d.x))
    .attr("cy", d => yScaleLinear(d.y));


   g.append("line")
       .attr("stroke", "green")
       .attr("stroke-width", 1)
       .datum(linearRegression(dataLinear))
       .attr("x1", d => xScaleLinear(d[0][0]))
       .attr("x2", d => xScaleLinear(d[1][0]))
       .attr("y1", d => yScaleLinear(d[0][1]))
       .attr("y2", d => yScaleLinear(d[1][1]));

//       .attr("class", "regression")
  // return svg.node();
}


// input data
data = [
  {"x": 8, "y": 3},
  {"x": 2, "y": 10},
  {"x": 11, "y": 3},
  {"x": 6, "y": 6},
  {"x": 5, "y": 8},
  {"x": 4, "y": 12},
  {"x": 12, "y": 1},
  {"x": 9, "y": 4},
  {"x": 6, "y": 9},
  {"x": 1, "y": 14}
];

// domain for drawing the regression line
domain = [-0.7, 13];

// function that does regression and plotting
doLinearRegression(data, domain);

