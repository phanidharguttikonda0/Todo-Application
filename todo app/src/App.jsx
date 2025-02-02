import { useState } from 'react'
import Authentication from './components/Authentication'
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;
import Home from './components/Home';

function App() {
  

  return (
    <BrowserRouter>
    
      <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/authentication' element={<Authentication />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
