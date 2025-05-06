import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Service from './Pages/Service';
import Vision from './Pages/Vision';
import Faq from './Pages/Faq';
import Footer from './components/Footer';
import About from './Pages/About';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route  path='/' element={<Home />} />
        <Route  path='/service' element={<Service />} />
        <Route  path='/vision' element={<Vision />} />
        <Route  path='/about' element={<About />} />
        <Route  path='/faq' element={<Faq />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
