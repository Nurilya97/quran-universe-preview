import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ImmersiveUniverse } from './components/ImmersiveUniverse.jsx'
import './components/Typography.css'
import './components/WordOrbit.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImmersiveUniverse />
  </StrictMode>,
)
