import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Description from "./pages/Description";
import Favorites from "./pages/Favorites";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/description" element={<Description/>} />
        <Route path= "/favorites" element={<Favorites/>} />
      </Routes>
    </Router>

  )
}

export default App
