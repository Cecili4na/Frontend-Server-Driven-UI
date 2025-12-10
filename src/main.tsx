import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@vtex/shoreline/css'
import './components/header/header.css'
import './components/shelf/shelf.css'
import { SDUIComponent } from './sdui/wrappers/sdui-wrapper'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SDUIComponent componentName="Header" />
    <p>Oi eu sou um carrossel</p>
    <SDUIComponent componentName="Shelf" />
    <p>Oi eu sou uma estante 2</p>
    <p>Oi eu sou um monte de fotinhas de promoções</p>
  </StrictMode>,
)
