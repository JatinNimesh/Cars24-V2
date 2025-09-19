import axios from 'axios';

// Fetch all road trips
export const fetchRoadTrips = async () => {
  const response = await axios.get('/api/roadTrips');
  return response.data;
};

// Fetch one trip by ID
export const fetchRoadTripById = async (id) => {
  const response = await axios.get(`/api/roadTrips/${id}`);
  return response.data;
};

// Create a new road trip
export const createRoadTrip = async (newTrip) => {
  try {
    const response = await axios.post('/api/roadTrips', newTrip);
    return response.data; // return created trip to the component
  } catch (error) {
    console.error("Error creating trip:", error);
    throw error; // rethrow so component can handle it
  }
};
