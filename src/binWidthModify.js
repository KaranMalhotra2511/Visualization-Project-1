function activateBinWidth(){
	
	d3.select("#binWidthUpdate").on("mousedown", function() {
  	
  	var div = d3.select(this)
	      	  .classed("active", true);

	var xPos = d3.mouse(div.node())[0]
	var w = d3.select(window)
		      .on("mousemove", mousemove)
		      .on("mouseup", function(){
		      	div.classed("active", false);
	    		w.on("mousemove", null).on("mouseup", null);
		      });

	  function mousemove() {
	  	if(d3.mouse(div.node())[0] + 20 < xPos && binWidth > 0){
	  		binWidth -= 1;
	  		cycleVariables();
	  		currColumn -= 1;
	  		xPos = d3.mouse(div.node())[0];
	  	}
	    else if(d3.mouse(div.node())[0] - 20 > xPos && binWidth < 8){
	  		binWidth += 1;
	  		cycleVariables();
	  		currColumn -= 1;
	  		xPos = d3.mouse(div.node())[0];
	  	}
	  }
});	
}
