"use client";

import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { easeLinear } from "d3-ease";
import {
  getStartingDate,
  getPlantOutDate,
  createXAxis,
  createMonthLabels,
  createGradients
} from './HelperFunctions';

const BarChart = ({ selectedPlantsData, frostDate }) => { 

  // d3 directly manipulates the actual DOM (not the virtual DOM that react manages)
  // useRef allows us to directly reference a specific DOM element that D3 can apply changes to
  const ref = useRef();

  // need a list of already rendered plants (so we can display them without the transition effect)
  const [renderedPlants, setRenderedPlants] = useState([])

  // Resize chart based on window size
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 800)
  useEffect(()=> {
    console.log('windowWidth change', window.innerWidth)
    const handleResize = () => {setWindowWidth(window.innerWidth)}
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // prevent multiple listeners being applied
  }, [])
  
  useEffect(() => {

    // ref.current gives d3 access to the actual div DOM node rendered by react
    // clears the previous d3 chart (so we aren't seeing a new additional chart every time we re-render)
    d3.select(ref.current).selectAll('*').remove();

    // Find plant that is in selectedPlantsData but not yet in renderedPlants
    const newlySelectedPlant = selectedPlantsData.filter((plant)=> !renderedPlants.some(renderedPlant => renderedPlant.id === plant.id))
    // Update rendered plants state
    setRenderedPlants(selectedPlantsData)
    
    const width = window.innerWidth - 100; const height = 350; const padding = 10;
    const svg = d3.select(ref.current)
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("height", "auto");

    const xScale = d3.scaleTime()
      .domain([new Date(2000, 0, 1), new Date(2000, 9, 1)])
      .range([0, width]);

    svg.selectAll("g")
      .data(selectedPlantsData)
      .enter()
      .append("g")
      .each(function(d, i) {
        const fullBar = d3.select(this);
  
        const startDate = getStartingDate(frostDate, d.rel_weeks_inside);
        const endDate = new Date(startDate).setDate(startDate.getDate() + d.weeks_total_growth * 7);     
        const plantTransplantDate = getPlantOutDate(frostDate, d.rel_weeks_outside)
        const startPoint = xScale(startDate);
        const endPoint = xScale(endDate);
        const plantTransplantPoint = xScale(plantTransplantDate);
        createGradients(svg, plantTransplantPoint, startPoint, endPoint);

        const isNew = newlySelectedPlant.some((plant) => plant.id === d.id);

        const leftRect = fullBar.append("rect")
          .attr("x", startPoint)
          .attr("y", i * 50)
          .attr("height", 40)
          .attr("fill", "url(#orange-gradient)");

          if (isNew) {
            leftRect
              .attr("width", 0)
              .transition()
              .duration((plantTransplantPoint - startPoint)*3)
              .ease(easeLinear)
              .attr("width", plantTransplantPoint - startPoint) 
          } else {
            leftRect.attr("width", plantTransplantPoint - startPoint);
          }

        const rightRect = fullBar.append("rect")
          .attr("x", plantTransplantPoint)
          .attr("y", i * 50)
          .attr("height", 40)
          .attr("fill", "url(#green-gradient)");

          if (isNew) {
            rightRect
              .attr("width", 0)
              .transition()
              .delay((plantTransplantPoint - startPoint)*3)
              .duration((endPoint - plantTransplantPoint)*3)          
              .ease(easeLinear)
              .attr("width", endPoint - plantTransplantPoint);
          } else {
            rightRect 
              .attr("width", endPoint - plantTransplantPoint)
          }
        
        // plant bar label  
        fullBar.append("text")
          .attr("x", endPoint - 5)
          .attr("y", i * 50 + 25)
          .attr("dominant-baseline", "middle")
          .attr("text-anchor", "end")
          .attr("fill", "white")
          .attr("font-size", 20)
          .attr("font-weight", "bold")
          .text(d.species);
      });
      createXAxis(svg, xScale, height, padding);
      createMonthLabels(svg, xScale, height);
        
    }, [selectedPlantsData, frostDate, windowWidth]
  )
  return <div ref={ref}></div>; // react assigns this div to ref.current
};

export default BarChart;