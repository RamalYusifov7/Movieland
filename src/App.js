import './App.scss';
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import SingleMovie from "./pages/SingleMovie"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
function App() {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/movies/:id' element={<SingleMovie />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
