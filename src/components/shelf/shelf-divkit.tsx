import { useEffect, useState } from 'react'
import { DivKitWrapper } from '../divkit/divkit-wrapper'
import { fetchDivKitJson } from '../../services/divkit-service'
import { Shelf } from './shelf'

export const ShelfDivKit = () => {
  const [json, setJson] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isMock, setIsMock] = useState(false)

  useEffect(() => {
    const loadShelf = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const result = await fetchDivKitJson('shelf')
        setJson(result)
        
        setIsMock(true)
      } catch (err) {
        console.error('Erro ao carregar shelf do DivKit:', err)
        setError(err instanceof Error ? err : new Error('Erro desconhecido'))
      } finally {
        setIsLoading(false)
      }
    }

    loadShelf()
  }, [])

  if (isLoading) {
    return <Shelf />
  }

  if (error || !json) {
    console.warn('Usando Shelf hardcoded como fallback')
    return <Shelf />
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
        id="shelf-divkit" 
        json={json}
        onError={(error) => {
          console.error('Erro no DivKit:', error)
        }}
      />
    </>
  )
}
