import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './pages/login.jsx';
import Main from './pages/main.jsx';
import Success from './pages/success.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"/>
        <Routes>
          <Route element={<LogIn/>} path="/"/>
          <Route element={<LogIn/>} path="/login"/>
          <Route element={<Main/>} path="/main"/>
          <Route element={<Success/>} path="/success"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
