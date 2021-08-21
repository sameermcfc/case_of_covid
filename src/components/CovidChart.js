import React, { useEffect, useState } from "react";
import axios from "axios";
import {Line} from 'react-chartjs-2'

const API_URL = "https://covid-api.mmediagroup.fr/v1/history?country=Australia&status=confirmed";

const DAILY_CASES = "https://covid-api.mmediagroup.fr/v1/cases?country=Australia";

const CovidChart = () => {
    const [data, setData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    //Updates data and places into data array using axios library
    useEffect(() => {
        axios.get(API_URL).then(res => setData(res.data));
        axios.get(DAILY_CASES).then(res => setDailyData(res.data));
    }, []);



    //Ensures data is not null, parses the JSON into NSW data and VIC data
    if (data && dailyData) {
    var labels = Object.keys(data["All"].dates).reverse();
        //NSW DATA 
    labels.push("21/08/21");
      var nswCases = Object.values(data["New South Wales"].dates).reverse();
      nswCases.push(dailyData["New South Wales"].confirmed)
      nswCases = nswCases.map((v,i,a) => v- (a[i-1] || 0));
      //VIC DATA
      var vicCases = Object.values(data["Victoria"].dates).reverse();
      vicCases.push(dailyData["Victoria"].confirmed)
      vicCases = vicCases.map((v,i,a) => v- (a[i-1] || 0));
    }

    

    return (
      <div>
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