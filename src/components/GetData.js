import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL =
  "https://covid-api.mmediagroup.fr/v1/history?country=Australia&status=confirmed";

const GetData = () => {
  const [data, setData] = useState(null);
  //Updates data and places into data array using axios library
  useEffect(() => {
    axios.get(API_URL).then((res) => setData(res.data));
  }, []);

  //Ensures data is not null, parses the JSON into NSW data and VIC data
  if(data){
  var labels = Object.keys(data["All"].dates).reverse();
  //NSW DATA
  var nswCases = Object.values(data["New South Wales"].dates).reverse();
  nswCases = nswCases.map((v, i, a) => v - (a[i - 1] || 0));
  //VIC DATA
  var vicCases = Object.values(data["Victoria"].dates).reverse();
  vicCases = vicCases.map((v, i, a) => v - (a[i - 1] || 0));
  }
  return { labels, nswCases, vicCases };
};

export default GetData;
