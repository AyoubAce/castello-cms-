import './styles/index.css';
import { ContextProvider } from './components/ContextApi';
import Menu from './pages/Menu';
import Album from './pages/Album';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login';


function App() {

  return (
    <BrowserRouter>
      <ContextProvider>
    <div className="App">
      <Routes>
        <Route exact path='/menu' element={<Menu/>} />
        <Route path='/galerie' element={<Album/>} />
        <Route path='/' exact element={<Login />} />  
      </Routes>
    </div>
      </ContextProvider>
      </BrowserRouter>
  );
}

export default App;
