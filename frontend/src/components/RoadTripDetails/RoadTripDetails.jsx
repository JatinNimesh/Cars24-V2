import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoadTripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`/api/roadTrips/${id}`);
        setTrip(response.data);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };
    fetchTrip();
  }, [id]);

  if (!trip) return <p>Loading trip details...</p>;

  return (
    <div>
      <h2>{trip.name}</h2>
      <p>Destination: {trip.destination}</p>
      <p>Start Date: {trip.startDate}</p>
      <p>End Date: {trip.endDate}</p>
    </div>
  );
};

export default RoadTripDetails;
