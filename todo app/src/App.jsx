import { useState } from 'react'
import Authentication from './components/Authentication'
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;
import Home from './components/Home';
import AddTodo from './components/AddTodo' ;
import CompletedTodos from './components/CompletedTodos' ;
import CurrentTodos from './components/CurrentTodos' ;
function App() {
  

  return (
    <BrowserRouter>
    
      <Routes>

            <Route path='/' element={<Home />} > 
            <Route index element={<CurrentTodos />} /> 
            <Route path="add-todo" element={<AddTodo />} />
          <Route path="completed-todos" element={<CompletedTodos />} />
            </Route>
            <Route path='/authentication' element={<Authentication />} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
