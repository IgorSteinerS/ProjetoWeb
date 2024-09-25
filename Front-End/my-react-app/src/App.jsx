import './App.css'
import './Styles/container.css'

import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'

function App() {
  
  return (
    <div>
      <Navbar />
      <h1>App</h1>
      <div className="container">
      <Outlet />
      </div>
      <p>Footer</p>
    </div>
    
  )
}

export default App
