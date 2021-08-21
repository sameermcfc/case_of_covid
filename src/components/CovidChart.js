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
        nswCases = nswCases && nswCases.slice(-7);
        vicCases = vicCases && vicCases.slice(-7);
        labels = labels && labels.slice(-7);
        setData({nswCases, vicCases, labels})
    }

    return ( 
       <div>
          <button>1W</button>
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                label: "NSW",
                data: nswCases && nswCases,
                fill: false,
                borderColor: "#36a2eb",
                tension: 0.1,
              },
              {
                label: "Vic",
                data: vicCases && vicCases,
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