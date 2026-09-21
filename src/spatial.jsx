import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/noto-sans-arabic/arabic-400.css'
import { ImmersiveUniverse } from './components/ImmersiveUniverse.jsx'
import './components/Typography.css'
import './components/WordOrbit.css'

const BUILD_SHA = import.meta.env.VITE_BUILD_SHA || ''

async function ensureFreshBuild() {
  if (!BUILD_SHA) return
  try {
    const response = await fetch((import.meta.env.BASE_URL || '/') + 'version.txt?t=' + Date.now(), { cache: 'no-store' })
    if (!response.ok) return
    const latest = (await response.text()).trim()
    if (latest && latest !== BUILD_SHA) {
      const url = new URL(window.location.href)
      url.searchParams.set('v', latest.slice(0, 8))
      window.location.replace(url.toString())
      await new Promise(() => {})
    }
  } catch {
    // Offline / transient network errors should not block the app.
  }
}

async function boot() {
  await ensureFreshBuild()
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ImmersiveUniverse />
    </StrictMode>,
  )
}

boot()
