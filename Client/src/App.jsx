import { useState } from 'react'
import UserForm from './components/UserForm'
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

import './App.css'
import UserList from './components/UserList'
import UserUpdate from './components/UserUpdate';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
    <nav>
  <Link to="/users" >UserForm</Link> <hr />
  <Link to="/users/list" >UserList</Link> <hr />
</nav>
    <Routes>
    <Route element={<UserForm/>} path="/users" default></Route>
    <Route element={<UserList/>} path="/users/list" default></Route>
    <Route element={<UserUpdate/>} path="/users/edit/:id" default></Route>
    </Routes>
    </BrowserRouter>
        </>
  )
}

export default App
