import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./Home/homePage";
import Login from "./login/login";
import Inscrire from "./signup/inscrire";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/e-shop"/>}/>
        <Route path="/e-shop" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/sign" element={<Inscrire/>} />
      </Routes>
    </Router>
  );
}

export default App;
