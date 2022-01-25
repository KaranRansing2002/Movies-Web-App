import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {BrowserRouter as Router,Switch,Route,BrowserRouter, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route path="/" exact element={<Banner/>}></Route>
          <Route path="/favourites" element={<Favourites/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Movies/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
