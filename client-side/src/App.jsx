import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import UserState from './context/notes/UserState';
import Alert from './components/Alert';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';


export default function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 4000);
  };
  const closeAlert = () => {
    setAlert(null)
  }

  return (
    <>
    <Router>
      <NoteState showAlert={showAlert}>
        <UserState showAlert={showAlert}>
          <Alert alert={alert} closeAlert={closeAlert}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loginsignup" element={<LoginSignup />} />
          </Routes>
        </UserState>
      </NoteState>
    </Router>
    </>
  )
}
