import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/login.jsx';
import Main from './pages/main.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header"/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Main/>} path="/main"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
