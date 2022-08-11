// STEP 1 - Include Dependencies

// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  // STEP 3 - Creating the JSON object to store the chart configurations
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Stars Per Language",
        //Set the chart value percentage
        percentage: 0,
        //Set the pie chart radius
        pieRadius: "45%",
        // Set the pie chart decimal point
        decimals: 0,
        //Set the theme for your chart
        theme: "candy",
        // Set the percentage value OFF
        showPercentValues: 0,
      },
      // Chart Data props
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
