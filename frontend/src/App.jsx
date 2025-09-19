import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import RoadTripDetails from './components/RoadTripDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/road-trip/:id" element={<RoadTripDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
