import { useState, useEffect } from "react";
import "./App.css";
import Flight from "./Flight";
import Nav from "./components/Nav";
import LoadingSpinner from "./components/LoadingSpinner";
import Button from "./components/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [flights, setFlights] = useState();
  const [departure, setDeparture] = useState("PRG");
  const [destination, setDestination] = useState("VLC");
  const [limit, setLimit] = useState(5);
  const [term, setTerm] = useState();
  const [searched, setSearched] = useState();
  const [stopover, setStopover] = useState(999);

  const url = `https://api.skypicker.com/flights?fly_from=${departure}&max_stopover=${stopover}&fly_to=${destination}&partner=data4youcbp202106&limit=${limit}`;

  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();

    return setFlights(data);
  }

  useEffect(() => {
    if (!departure || !destination) return;
    console.log(stopover);
    fetchData(url);
  }, [departure, destination, limit, stopover, url]);

  console.log(flights);

  return (
    <div className="App">
      <h1>Flights List</h1>
      <Nav
        setDeparture={setDeparture}
        setDestination={setDestination}
        setTerm={setTerm}
        term={term}
        departure={departure}
        destination={destination}
        setSearched={setSearched}
        searched={searched}
        setStopover={setStopover}
      />

      {departure && destination ? (
        <div>
          {flights ? (
            flights?.data?.map((flight, i) => (
              <Flight key={i} flight={flight} />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      ) : (
        <p>Please Select Departure and Destination</p>
      )}
      {flights ? <Button onClick={() => setLimit(limit + 5)} /> : null}
    </div>
  );
}

export default App;
