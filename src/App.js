import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/Login';
import Homepage from './views/homepage/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import School from './views/school/School';
import Driver from './views/driver/Driver';
import Vehicle from './views/vehicle/Vehicle';
import Device from './views/device/Device';
import { AuthProvider } from './views/providers/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/driver' element={<Driver/>}/>
          <Route path='/school' element={<School/>}/>
          <Route path='/vehicle' element={<Vehicle/>}/>
          <Route path='/device' element={<Device/>}/>
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
