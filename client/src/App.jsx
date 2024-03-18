import { useState, React } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router>
      <div>
      <Header/>
      <main>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </Router>
  )
}

export default App
