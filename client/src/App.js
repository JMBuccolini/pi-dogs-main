import './styles/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import DogCreate from './components/DogCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        
      <Routes>
        <Route exact path='/' element= {<LandingPage/>}/>
        <Route path='/home' element= {<Home/>}/>
        <Route path='/dog' element= {<DogCreate/>}/>
        
      </Routes>  
      
    </div>
    </BrowserRouter>
  );
}

export default App;
