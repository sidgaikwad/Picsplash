import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Unsplash from './Components/Unsplash';

import { DataContextProvider } from './Context/Context';

function App() {

  return (
    <>
      <DataContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Unsplash />} />
          </Routes>
        </Router>
      </DataContextProvider>
    </>
  );
}

export default App;
