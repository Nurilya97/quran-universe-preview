import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-sans-arabic/arabic-400.css'
import { ImmersiveUniverse } from './components/ImmersiveUniverse.jsx'
import './components/Typography.css'
import './components/WordOrbit.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImmersiveUniverse />
  </StrictMode>,
)
