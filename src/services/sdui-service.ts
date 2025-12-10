import headerMockData from '../mocks/header-mock.json'
import shelfMockData from '../mocks/shelf-mock.json'

const headerMock = headerMockData as any
const shelfMock = shelfMockData as any

const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  FORCE_MOCK: import.meta.env.VITE_FORCE_SDUI_MOCK === 'true',
  TIMEOUT: 5000,
}

export type SDUIComponentType = 'header' | 'shelf' | 'carousel' | 'promotions' | string

const MOCK_MAP: Record<string, any> = {
  header: headerMock,
  shelf: shelfMock,
  carousel: null,
  promotions: null,
}

async function loadLocalJson(componentName: string): Promise<any | null> {
  try {
    const jsonPath = `../mocks/${componentName.toLowerCase()}-mock.json`
    const module = await import(/* @vite-ignore */ jsonPath)
    return module.default || module
  } catch {
    return null
  }
}

async function fetchWithTimeout(url: string, timeout: number): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function fetchSDUIJson(
  componentType: SDUIComponentType | string
): Promise<any> {
  const componentName = typeof componentType === 'string' ? componentType : componentType
  
  if (CONFIG.FORCE_MOCK) {
    const mock = MOCK_MAP[componentName]
    if (mock) {
      return mock
    }
  }

  const apiUrl = `${CONFIG.API_BASE_URL}/sdui/${componentName}`
  
  console.log(`[SDUI] Tentando buscar ${componentName} de: ${apiUrl}`)
  console.log(`[SDUI] FORCE_MOCK: ${CONFIG.FORCE_MOCK}, API_BASE_URL: ${CONFIG.API_BASE_URL}`)
  
  try {
    const response = await fetchWithTimeout(apiUrl, CONFIG.TIMEOUT)
    
    if (response.ok) {
      const json = await response.json()
      console.log(`[SDUI] ✅ JSON recebido da API para ${componentName}:`, json)
      return json
    } else {
      console.warn(`[SDUI] ⚠️ API retornou status ${response.status} para ${componentName}`)
    }
  } catch (error: any) {
    console.warn(`[SDUI] ❌ Backend não disponível para ${componentName}:`, error?.message || error)
  }

  try {
    const localJson = await loadLocalJson(componentName)
    if (localJson) {
      return localJson
    }
  } catch (error) {
  }

  const mock = MOCK_MAP[componentName]
  
  if (!mock) {
    throw new Error(`JSON não encontrado para componente: ${componentName}`)
  }
  
  return mock
}
