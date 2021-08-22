import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2'

const API_URL =
  "https://covid-api.mmediagroup.fr/v1/history?country=Australia&status=confirmed";


const CovidChart = () => {
  const[covidData, setData] = useState("");
  
  
  useEffect(()=> {
    if(!covidData){
      getData();
    }
  }, []);

  const getData = async (num) => {
    let response = await axios.get(API_URL);
    let data = await response.data;
    
    var labels = data && Object.keys(data["All"].dates).reverse();
  //NSW DATA
    var nswCases = data && Object.values(data["New South Wales"].dates).reverse();
    nswCases = nswCases && nswCases.map((v, i, a) => v - (a[i - 1] || 0));
  
  //VIC DATA
    var vicCases = data && Object.values(data["Victoria"].dates).reverse();
    vicCases = vicCases && vicCases.map((v, i, a) => v - (a[i - 1] || 0));

    if(num){
      nswCases = nswCases.slice(num);
      vicCases = vicCases.slice(num);
      labels = labels.slice(num);
      console.log(nswCases, vicCases, labels)
    }

    setData({labels, nswCases, vicCases});
  }

    return ( 
       <div>
           <button onClick = { () => {getData(-7)}}>1W</button>
           <button onClick = { () => {getData(-30)}}>1M</button>
           <button onClick = { () => {getData(-90)}}>3M</button>
           <button onClick = { () => {getData(-180)}}>6M</button>
           <button onClick = { () => {getData(-360)}}>12M</button>
        <Line
          data={{
            labels: covidData.labels,
            datasets: [
              {
                label: "NSW",
                data: covidData.nswCases,
                fill: false,
                borderColor: "#36a2eb",
                tension: 0.1,
              },
              {
                label: "Vic",
                data: covidData.vicCases,
                fill: false,
                borderColor: "#ff6384",
                tension: 0.1,
              }
            ],
          }}
        />
      </div>
    );
}

export default CovidChart;