import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ImmersiveUniverse } from './components/ImmersiveUniverse.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImmersiveUniverse />
  </StrictMode>,
)

