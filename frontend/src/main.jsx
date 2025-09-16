import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { Global } from './Global.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Global>
        <App />
    </Global>
            
  </BrowserRouter>

)
