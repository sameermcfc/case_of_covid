import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2'
import GetData from './GetData';



const CovidChart = () => {
    const[covidData, setData] = useState(null)
    var newData = GetData();
    useEffect(()=> {
        setData(newData)
    }, []);
    if(covidData!=null){
        var nswCases = covidData.nswCases;
        var vicCases = covidData.vicCases
        var labels = covidData.labels;
    }

    function update(){
        nswCases = nswCases.slice(-7);
        vicCases = vicCases.slice(-7);
        labels = labels.slice(-7);
        setData({nswCases, vicCases, labels})
    }

    function update30(){
        nswCases = nswCases.slice(-30);
        vicCases = vicCases.slice(-30);
        labels = labels.slice(-30);
        setData({nswCases, vicCases, labels})
    }

    function update90(){
        nswCases = nswCases && nswCases.slice(-90);
        vicCases = vicCases && vicCases.slice(-90);
        labels = labels && labels.slice(-90);
        setData({nswCases, vicCases, labels})
    }

    return ( 
       <div>
           <button onClick={update}>1W</button>
           <button onClick={update30}>1M</button>
           <button onClick={update90}>3M</button>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "NSW",
                data: nswCases,
                fill: false,
                borderColor: "#36a2eb",
                tension: 0.1,
              },
              {
                label: "Vic",
                data: vicCases,
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