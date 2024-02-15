import React, { useState, useEffect } from "react";
import DropDownList from "./DropDownList";
import axios from "axios";

const LoginPage = () => {
  // const options = ["Apple", "Banana", "Orange", "Grapes", "Watermelon"];
  const [selectedOption, setSelectedOption] = useState("");
  const stationsTemp = [
    {
      _id: 1,
      StationId: "12860",
      CityCode: "1161",
      CityName: "רהט",
      MetropolinCode: "3",
      MetropolinName: "באר שבע",
      StationTypeCode: "1",
      StationTypeName: "תחנה רגילה",
      Lat: "31.386868",
      Long: "34.746346",
      Neighborhood: "רהט",
      YishuvSta: "11610032.0",
    },
    {
      _id: 2,
      StationId: "43696",
      CityCode: "8200",
      CityName: "קריית מוצקין",
      MetropolinCode: "2",
      MetropolinName: "חיפה",
      StationTypeCode: "1",
      StationTypeName: "תחנה רגילה",
      Lat: "32.85112",
      Long: "35.08636",
      Neighborhood: "אביבים, בנה ביתך, משכנות אמנים",
      YishuvSta: "82000013.0",
    },
    {
      _id: 3,
      StationId: "12849",
      CityCode: "2630",
      CityName: "קריית גת",
      MetropolinCode: "-1",
      MetropolinName: "לא מוגדר",
      StationTypeCode: "1",
      StationTypeName: "תחנה רגילה",
      Lat: "31.623615",
      Long: "34.774291",
      Neighborhood: "כרמי גת",
      YishuvSta: "26300042.0",
    },
  ];
  const [stations, setStations] = useState(stationsTemp);
  // async function getStations() {
  //   const data = await axios.get(
  //     "https://data.gov.il/api/3/action/datastore_search?resource_id=e873e6a2-66c1-494f-a677-f5e77348edb0"
  //   );
  //   setStations(data.data.result.records);
  // }
  // useEffect(() => {
  //   const tempStations = getStations();
  //   console.log(tempStations.Object);
  // }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h1>רשימת הערים</h1>
      <DropDownList options={stations} onSelect={handleSelect} />
      <p>העיר שנבחרה {selectedOption.CityName}</p>
    </div>
  );
};

export default LoginPage;
