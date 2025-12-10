import tenisVans1 from '../assets/images/tenis vans 1.jpg'
import tenisVans2 from '../assets/images/tenis vans 2.jpg'
import tenisVans3 from '../assets/images/tenis vans 3.jpg'
import vansLogo from '../assets/images/vans_logo.jpg'

const imageMap: Record<string, string> = {
  'tenis vans 1.jpg': tenisVans1,
  'tenis vans 2.jpg': tenisVans2,
  'tenis vans 3.jpg': tenisVans3,
  'vans_logo.jpg': vansLogo,
}

export function resolveImageUrl(imageUrl: string): string {
  if (!imageUrl) return ''
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('/')) {
    return imageUrl
  }
  
  const fileName = imageUrl.split('/').pop() || imageUrl
  const resolved = imageMap[fileName]
  
  if (resolved) {
    return resolved
  }
  
  return imageUrl
}

