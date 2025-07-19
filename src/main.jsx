import { StrictMode } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from 'react-router'
import { createRoot } from 'react-dom/client'
import './css/colors.css'
import './css/main.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
