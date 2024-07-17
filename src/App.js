import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/Login';
import Homepage from './views/homepage/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterDriver from './views/registerDriver/RegisterDriver';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/school-transport-frontend-web' element={<Login/>}/>
        <Route path='/school-transport-frontend-web/homepage' element={<Homepage/>}/>
        <Route path='/school-transport-frontend-web/drivers-register' element={<RegisterDriver/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
