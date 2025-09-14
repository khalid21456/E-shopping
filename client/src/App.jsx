import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./Home/homePage";
import Login from "./login/login";
import Inscrire from "./signup/inscrire";
import StorePage from "./marche/storePage";
import Verification from "./signup/verification";
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/e-shop"/>}/>
        <Route path="/e-shop" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />  
        <Route path="/sign" element={<Inscrire/>} />
        <Route path="/store" element={<StorePage/>} />
        <Route path="verify" element={<Verification/>} />
      </Routes>
    </Router>
  );
}

export default App;
