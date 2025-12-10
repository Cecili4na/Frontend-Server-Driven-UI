import {
  Flex,
  Link,
  Text,
  Container,
} from '@vtex/shoreline'
import './shelf.css'
import tenisVans1 from '../../assets/images/tenis vans 1.jpg'
import tenisVans2 from '../../assets/images/tenis vans 2.jpg'
import tenisVans3 from '../../assets/images/tenis vans 3.jpg'
import { resolveImageUrl } from '../../utils/image-resolver'

interface ShelfItem {
  id: string
  title: string
  price: string
  imageUrl: string
  href: string
}

interface ShelfProps {
  title?: string
  items?: ShelfItem[]
}

const defaultItems: ShelfItem[] = [
  {
    id: '1',
    title: 'Tênis Vans 1',
    price: 'R$ 299,90',
    imageUrl: tenisVans1,
    href: '/produto/1',
  },
  {
    id: '2',
    title: 'Tênis Vans 2',
    price: 'R$ 349,90',
    imageUrl: tenisVans2,
    href: '/produto/2',
  },
  {
    id: '3',
    title: 'Tênis Vans 3',
    price: 'R$ 399,90',
    imageUrl: tenisVans3,
    href: '/produto/3',
  },
]

export const Shelf = ({ title = 'Produtos em Destaque', items = defaultItems }: ShelfProps) => {
  return (
    <section data-shelf>
      <Container data-shelf-container>
        {title && (
          <Flex justify="center" data-shelf-title-wrapper>
            <Text variant="display4" data-shelf-title>{title}</Text>
          </Flex>
        )}
        
        <Flex gap="24" wrap="wrap" justify="center" data-shelf-items>
          {items.map((item) => (
            <Link key={item.id} href={item.href} data-shelf-item>
              <Flex direction="column" gap="8" data-shelf-item-content>
                <div data-shelf-item-image-wrapper>
                  <img 
                    src={resolveImageUrl(item.imageUrl)} 
                    alt={item.title}
                    data-shelf-item-image
                  />
                </div>
                <Flex direction="column" gap="4" align="center" data-shelf-item-info>
                  <Text variant="body" data-shelf-item-title>{item.title}</Text>
                  <Text variant="body" data-shelf-item-price>{item.price}</Text>
                </Flex>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Container>
    </section>
  )
}
