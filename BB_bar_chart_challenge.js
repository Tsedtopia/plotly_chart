function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    buildGauge(firstSample);
  });
}
// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  buildGauge(newSample); 
}
// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
var samplesArray = samples.filter(sampleObj => sampleObj.id == sample)
    //  5. Create a variable that holds the first sample in the array.
var samplesResult = samplesArray[0];
console.log(samplesResult)    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
var otuIds = samplesResult.otu_ids;
var otulabels = samplesResult.otu_labels;
var samplevalues = samplesResult.sample_values;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.
var sortedSamples = otuIds.sort((a,b) =>
a.sampeValues = b.sampleValues).reverse();
console.log(sortedSamples);     
    //var yticks = 

    // 8. Create the trace for the bar chart. 
var trace = {
  x: sortedSamples,
  y: yticks,
  type: "bar"
}    
var barData = [trace];
    // 9. Create the layout for the bar chart. 
var barLayout = {
  title: "Top 10 Bacteria Cultures Found"
};
    // 10. Use Plotly to plot the data with the layout. 
Plotly.newPlot("bar", barData, barLayout)   
  });
}

    //"Gauge" chart
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var resultWfreq = resultArray[0].wfreq;


    var data3 = [
      {        
        value: resultWfreq,
        title: { text: "Belly Button Washing Frequency\n(Scrubs per Week)" },
        type: "indicator",
        mode: "gauge+delta",
        delta: { reference: 0 },
        
        gauge: {
          axis: { range: [0, 10],tickwidth: 1, tickcolor: "darkblue"  },
          
          bar: { color: "orange" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "black",
          steps: [
            { range: [0, 1], color: "rgba(0, 255,0, 0.6)" },
            { range: [1, 2], color: "rgba(30, 255, 0, 0.6)" },
            { range: [2, 3], color: "rgba(60, 255, 0, 0.6)" },
            { range: [3, 4], color: "rgba(90, 255, 0, 0.6)" },
            { range: [4, 5], color: "rgba(120, 255, 0, 0.6)" },
            { range: [5, 6], color: "rgba(150, 255, 0, 0.6)" },
            { range: [6, 7], color: "rgba(180, 255, 0, 0.6)" },
            { range: [7, 8], color: "rgba(210, 255, 0, 0.6)" },
            { range: [8, 9], color: "rgba(240, 255, 0, 0.6)" },
            { range: [9, 10], color: "rgba(255, 255, 0, 0.6)" }
          ]
          
        }
      }
    ];
    
    var layout3 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', data3, layout3);
})
