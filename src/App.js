import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
