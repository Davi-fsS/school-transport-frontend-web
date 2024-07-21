import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './views/login/Login';
import Homepage from './views/homepage/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterDriver from './views/registerDriver/RegisterDriver';
import RegisterSchool from './views/registerSchool/RegisterSchool';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/drivers-register' element={<RegisterDriver/>}/>
        <Route path='/school' element={<RegisterSchool/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
