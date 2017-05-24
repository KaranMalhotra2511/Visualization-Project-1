function createHistogram(histData){
  var svg = d3.select("#bar")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

  var scaleHeight = (0.9*h/d3.max(histData));

  var color =d3.scale.category10();

  var bars = svg.selectAll("bar")
             .data(histData)
             .enter()
             .append("rect")
             .attr("x", function(d, i) {
                  return i * (w / histData.length);
             })
             .attr("width", w / histData.length)
             .attr("y", function(d) {
                  return h - (d * scaleHeight);
             })
             .attr("height", function(d) {
                  return d * scaleHeight;
             })
             .attr('fill', function(d,i){
              return color(i);
            })
             .on("mouseover", function(d,i) {
                  d3.select(this)
                  .attr("stroke", "black")
                  .attr("y",d3.select(this).attr("y") - 15)
                  .attr("height",parseInt(d3.select(this).attr("height")) + 15)
                  .attr("x",i * (w / histData.length) - 5)
                  .attr("width",w / histData.length + 10)
                  
                  d3.selectAll("text")
                  .select(function(d, ind) { return ind === i ? this : null; })
                  .style("opacity",100)

             })
             .on("mouseout", function(d,i) {
                  d3.select(this)
                  .attr("width", w / histData.length)
                  .attr("y",parseInt(d3.select(this).attr("y")) + 15)
                  .attr("x",i * (w / histData.length))
                  .attr("height",parseInt(d3.select(this).attr("height")) - 15)
                  
                  d3.selectAll("text")
                  .select(function(d, ind) { return ind === i ? this : null; })
                  .style("opacity",0)})
             .on("click",function(){
                document.getElementById("bar").innerHTML = '';
                createPieChart(histData);
                currFigure = 1;
              });
             fillTextHistogram(dataS,svg);

} 

function fillTextHistogram(histData,svg){

  var scaleHeight = (0.9*h/d3.max(histData));
  var text = svg.selectAll("text")
             .data(histData)
             .enter()
             .append("text")
             .text(function(d) {
                return d;
             })
             .attr("text-anchor", "middle")
             .attr("x", function(d, i) {
                return i * (w / histData.length) + (w / histData.length) / 2;
             })
             .attr("y", function(d) {
                  return h - (d * scaleHeight) - 20;
             })
             .attr("font-family", "sans-serif")
             .attr("font-size", 20)
             .attr("fill", "black")
                   .style("opacity",0);
}
