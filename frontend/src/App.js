import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import PatientDashboard from './pages/PatientDashboard';
import AdminPage from './pages/AdminPage';

//test

import Home from './pages/Home';


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        {/* Home page /> */}
        <Route path='/' element={<Navigate to="/Home.html" />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        {/* <Authentication /> */}  
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
          
        {/* patient dashboard /> */}
        <Route path='/patientdashboard' element={<PatientDashboard />} />
        
        {/* <admin dashboard /> */}  
        <Route path='/adminPage' element={<AdminPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;