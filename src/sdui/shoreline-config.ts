const ShorelineTokens = {
  colors: {
    white: 'var(--sl-color-white)',
    black: 'var(--sl-color-black)',
    neutral1000: 'var(--sl-color-neutral-1000)',
    neutral600: 'var(--sl-color-neutral-600)',
    neutral100: 'var(--sl-color-neutral-100)',
  },
  shadows: {
    sm: 'var(--sl-shadow-sm)',
    base: 'var(--sl-shadow-base)',
    md: 'var(--sl-shadow-md)',
    lg: 'var(--sl-shadow-lg)',
  },
}

export function resolveShorelineToken(path: string): string {
  const parts = path.split('.')
  let value: any = ShorelineTokens
  
  for (const part of parts) {
    value = value?.[part]
    if (!value) {
      const found = findTokenRecursively(ShorelineTokens, path)
      return found || path
    }
  }
  
  return typeof value === 'string' ? value : path
}

function findTokenRecursively(obj: any, searchKey: string): string | null {
  for (const key in obj) {
    if (key === searchKey && typeof obj[key] === 'string') {
      return obj[key]
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const found = findTokenRecursively(obj[key], searchKey)
      if (found) return found
    }
  }
  return null
}

