import headerMockData from '../mocks/header-mock.json'
import shelfMockData from '../mocks/shelf-mock.json'

const headerMock = headerMockData as any
const shelfMock = shelfMockData as any

const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  FORCE_MOCK: import.meta.env.VITE_FORCE_DIVKIT_MOCK === 'true',
  TIMEOUT: 5000,
}

export type DivKitComponentType = 'header' | 'shelf' | 'carousel' | 'promotions'

const MOCK_MAP: Record<DivKitComponentType, any> = {
  header: headerMock,
  shelf: shelfMock,
  carousel: null,
  promotions: null,
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

export async function fetchDivKitJson(
  componentType: DivKitComponentType
): Promise<any> {
  if (CONFIG.FORCE_MOCK) {
    console.log(`[DivKit Service] Usando mock forçado para: ${componentType}`)
    return MOCK_MAP[componentType]
  }

  const apiUrl = `${CONFIG.API_BASE_URL}/divkit/${componentType}`
  
  try {
    console.log(`[DivKit Service] Tentando buscar de: ${apiUrl}`)
    
    const response = await fetchWithTimeout(apiUrl, CONFIG.TIMEOUT)
    
    if (response.ok) {
      const json = await response.json()
      console.log(`[DivKit Service] JSON recebido do backend para: ${componentType}`)
      return json
    } else {
      console.warn(`[DivKit Service] Backend retornou erro ${response.status}, usando mock`)
    }
  } catch (error) {
    console.warn(
      `[DivKit Service] Erro ao buscar do backend:`,
      error instanceof Error ? error.message : error
    )
    console.log(`[DivKit Service] Usando mock para: ${componentType}`)
  }

  const mock = MOCK_MAP[componentType]
  
  if (!mock) {
    throw new Error(`Mock não encontrado para componente: ${componentType}`)
  }
  
  return mock
}

export async function useDivKitJson(componentType: DivKitComponentType) {
  try {
    const json = await fetchDivKitJson(componentType)
    return {
      json,
      isLoading: false,
      error: null,
      isMock: CONFIG.FORCE_MOCK || !navigator.onLine,
    }
  } catch (error) {
    return {
      json: null,
      isLoading: false,
      error: error instanceof Error ? error : new Error('Erro desconhecido'),
      isMock: true,
    }
  }
}

export async function checkBackendAvailability(): Promise<boolean> {
  if (CONFIG.FORCE_MOCK) {
    return false
  }

  try {
    const response = await fetchWithTimeout(
      `${CONFIG.API_BASE_URL}/health`,
      CONFIG.TIMEOUT
    )
    return response.ok
  } catch {
    return false
  }
}
