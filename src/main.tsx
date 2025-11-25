import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '@vtex/shoreline/css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <p>Oi eu sou um header</p>
    <p>Oi eu sou um carrossel</p>
    <p>Oi eu sou uma estante</p>
    <p>Oi eu sou uma estante 2</p>
    <p>Oi eu sou um monte de fotinhas de promoções</p>
  </StrictMode>,
)
