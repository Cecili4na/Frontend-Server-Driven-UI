import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@vtex/shoreline/css'
import '@divkitframework/divkit/dist/client.css'

import { HeaderDivKit } from './components/header/header-divkit'
import { ShelfDivKit } from './components/shelf/shelf-divkit'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderDivKit />
    
    <p>Oi eu sou um carrossel</p>
    
    <ShelfDivKit />
    
    <p>Oi eu sou uma estante 2</p>
    <p>Oi eu sou um monte de fotinhas de promoções</p>
  </StrictMode>,
)
