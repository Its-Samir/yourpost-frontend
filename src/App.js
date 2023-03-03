import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Login from "./auth/Login";
import Register from "./auth/Register";
import { AuthContext } from './AuthContext';
import Home from './home/Home';
import Profile from './profile/Profile';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={ctx.user ? <Home /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:username' element={ctx.user ? <Profile username={ctx.user.username} /> : <Navigate to={'/login'} replace={true} />} />
      </Routes>
    </div >
  );
}

export default App;
