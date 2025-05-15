import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import Service from './Pages/Service';
import Vision from './Pages/Vision';
import Faq from './Pages/Faq';
import Footer from './components/Footer';
import About from './Pages/About';
import Dashboard from './Admin/Components/Dashboard';
import Adminservices from './Admin/Pages/Services/Services';
import Adminvisions from './Admin/Pages/Visions/Visions';
import Adminfaqs from './Admin/Pages/Faqs/Faqs';
import ServiceState from './Admin/context/services/ServiceState';
import VisionState from './Admin/context/visions/VisionState';
import FaqState from './Admin/context/faqs/FaqState';
import AdminLoign from './Admin/Components/Login';
import AdminSignup from './Admin/Components/Signup'

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
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/service' element={<Adminservices />} />
        <Route path='/admin/vision' element={<Adminvisions />} />
        <Route path='/admin/faq' element={<Adminfaqs />} />
        <Route path='/admin' element={<AdminLoign />} />
        <Route path='/admin/Signup' element={<AdminSignup />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (

    <ServiceState>
      <VisionState>
        <FaqState>
          <Router>
            <AppContent />
          </Router>
        </FaqState>
      </VisionState>
    </ServiceState>

  );
}

export default App;
