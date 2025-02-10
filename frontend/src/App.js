import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import CreateGame from './pages/CreateGame';
import GamePage from './pages/GamePage'
import IndividualGame from './pages/IndividualGame'

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/create-game" element={<CreateGame/>}></Route>
        <Route path="/games" element={<GamePage/>}></Route>
        <Route path="/game/:id" element={<IndividualGame/>}></Route>
        


        {/* This needs to be at the bottom */}
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>

    </div>

  );
}

export default App;
