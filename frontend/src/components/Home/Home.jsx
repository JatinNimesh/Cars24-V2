import React, { useEffect, useState } from "react";
import { fetchRoadTrips } from "../api/roadTrips";

const Home = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const data = await fetchRoadTrips();
      setTrips(data);
    };
    loadTrips();
  }, []);

  return (
    <div>
      <h1>All Road Trips</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>{trip.name} — {trip.destination}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
