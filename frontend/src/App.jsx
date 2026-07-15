import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Loader from './components/Loader';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);

  return (
    <AuthProvider>
      {!loaderFinished && (
        <Loader onComplete={() => setLoaderFinished(true)} />
      )}
      
      {loaderFinished && (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </AuthProvider>
  );
}
