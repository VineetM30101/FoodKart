//import React from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import {Route, Routes} from "react-router-dom"
import Add from './pages/Add/add'
import List from "./pages/List/list"
import Orders from "./pages/Orders/orders"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}></Route>
          <Route path="/list" element={<List url={url}/>}></Route>
          <Route path="/orders" element={<Orders url={url}/>}></Route>
        </Routes>
      </div>
    </div>
  )
}


export default App
