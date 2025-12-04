import { useEffect, useState } from 'react'
import { DivKitWrapper } from '../divkit/divkit-wrapper'
import { fetchDivKitJson } from '../../services/divkit-service'
import { Header } from './header'

export const HeaderDivKit = () => {
  const [json, setJson] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isMock, setIsMock] = useState(false)

  useEffect(() => {
    const loadHeader = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const result = await fetchDivKitJson('header')
        setJson(result)
        
        setIsMock(true)
      } catch (err) {
        console.error('Erro ao carregar header do DivKit:', err)
        setError(err instanceof Error ? err : new Error('Erro desconhecido'))
      } finally {
        setIsLoading(false)
      }
    }

    loadHeader()
  }, [])

  if (isLoading) {
    return <Header />
  }

  if (error || !json) {
    console.warn('Usando Header hardcoded como fallback')
    return <Header />
  }

  return (
    <>
      {isMock && (
        <div style={{ 
          padding: '4px 8px', 
          background: '#ffeb3b', 
          fontSize: '12px',
          textAlign: 'center'
        }}>
          🧪 Modo Mock - Usando JSON local (simulando backend)
        </div>
      )}
      <DivKitWrapper 
        id="header-divkit" 
        json={json}
        onError={(error) => {
          console.error('Erro no DivKit:', error)
        }}
      />
    </>
  )
}
