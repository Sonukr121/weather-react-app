import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";
import axios from "axios";
import { setFunction } from "./icons";

function Main() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai")
  const [icon, setIcon] = useState(null);


  useEffect(() => {
    async function getData() {
      let api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e372b05812aeb784eeaf4afbf781f6d1

  `;
      try {
        let response = await fetch(api);
        let datas = await response.json();
        console.log(datas)
        setCity(datas);
        if (datas?.name) {
          setIcon(datas.weather[0].icon)
        }

      } catch (error) {
        console.log(error.response.datas.message);
      }
    }
    getData();
  }, [search]);

  console.log(city);

  return (
    <div>
      <div><h1>Welcome to Weather Project</h1>
        <input type="search" placeholder="search city"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {
        city?.name ?
          (<Card search={search} city={city} url={setFunction(icon)} />)
          : (<div> <h1>City not found</h1></div>)
      }


    </div>
  );
}

export default Main;