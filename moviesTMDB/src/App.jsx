import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Description from "./pages/Description";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/movie/:id" element={<Description/>} />
        <Route path= "/favorites" element={<Favorites/>} />
      </Routes>
      <Footer/>
      
    </Router>

  )
}

export default App
