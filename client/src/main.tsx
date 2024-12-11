import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UsersProvider } from './contexts/UsersContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <UsersProvider>
   <BrowserRouter>
       <App />
   </BrowserRouter>
   </UsersProvider>
   
  // </StrictMode>,
)
