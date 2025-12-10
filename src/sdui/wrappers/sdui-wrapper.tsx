import { useEffect, useState } from 'react'
import { fetchSDUIJson } from '../../services/sdui-service'
import { getComponent } from '../registry/component-registry'

interface SDUIComponentProps {
  componentName: string
}

export function SDUIComponent({ componentName }: SDUIComponentProps) {
  const [json, setJson] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadComponent() {
      try {
        setLoading(true)
        const data = await fetchSDUIJson(componentName.toLowerCase())
        setJson(data)
        setError(null)
      } catch (err: any) {
        setError(err?.message || 'Erro ao carregar componente')
        console.error(`[SDUI] Erro ao carregar ${componentName}:`, err)
      } finally {
        setLoading(false)
      }
    }

    loadComponent()
  }, [componentName])

  if (loading) {
    return <div>Carregando {componentName}...</div>
  }

  if (error) {
    return <div>Erro: {error}</div>
  }

  if (!json) {
    return <div>Componente {componentName} não encontrado</div>
  }

  const componentNameFromJson = json.component_name || json.props?.component_name || componentName
  const Component = getComponent(componentNameFromJson)

  if (!Component) {
    return <div>Componente {componentNameFromJson} não registrado</div>
  }

  const props = json.props || {}

  return <Component {...props} />
}

