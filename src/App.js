import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Service from './Pages/Service';
import Vision from './Pages/Vision';
import Faq from './Pages/Faq';
import Footer from './components/Footer';
import About from './Pages/About';
import Dashboard from './Admin/Pages/Dashboard';
import Adminservices from './Admin/Pages/Services';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/service' element={<Service />} />
        <Route path='/vision' element={<Vision />} />
        <Route path='/about' element={<About />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path='/admin/service' element={<Adminservices />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
