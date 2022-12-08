import './App.css';
import { Route, Routes} from "react-router-dom"
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Auth from "./hoc/auth"

function App() {
  return (
      <Routes>
        <Route exact path="/" element={Auth(<LandingPage />, true)}/>
        <Route exact path="/login" element={Auth(<LoginPage />, false)}/>
        <Route exact path="/register" element={Auth(<RegisterPage />, null)}/>
      </Routes>
  );
}

export default App;
