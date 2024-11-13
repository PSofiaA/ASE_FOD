import './assets/reset.css'
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";

const el = document.getElementById('root')


createRoot(el).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)
