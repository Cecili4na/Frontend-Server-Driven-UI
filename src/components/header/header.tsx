import {
  Flex,
  Link,
  IconButton,
  IconUser,
  IconShoppingCartSimple,
  IconList,
  IconX,
  IconMagnifyingGlass,
  IconMapPin,
  IconHeadset,
  IconHeart,
  IconArrowDown,
  IconCloudArrowUp,
  Text,
  Container,
} from '@vtex/shoreline'
import './header.css'
import logoImg from '../../assets/images/vans_logo.jpg'

const topMenuItems = [
  { label: 'Baixe o App', href: '/app', icon: 'download' as const },
  { label: 'Sua localização', href: '/localizacao', icon: 'map' as const },
  { label: 'Atendimento', href: '/atendimento', icon: 'headset' as const },
]

const mainMenuItems = [
  { label: 'Novidades', href: '/novidades', hasDropdown: true, isHighlight: false },
  { label: 'Calçados', href: '/calcados', hasDropdown: true, isHighlight: false },
  { label: 'Roupas', href: '/roupas', hasDropdown: true, isHighlight: false },
  { label: 'Acessórios', href: '/acessorios', hasDropdown: true, isHighlight: false },
  { label: 'Estilos', href: '/estilos', hasDropdown: true, isHighlight: false },
  { label: 'Clássicos', href: '/classicos', hasDropdown: true, isHighlight: false },
  { label: 'Black Friday', href: '/black-friday', hasDropdown: true, isHighlight: true },
]

export const Header = () => {
  return (
    <header data-header>
      <Container data-header-container>
        <Flex align="flex-end" justify="space-between" gap="48">
          <Link href="/" data-header-logo data-testid="ta-logotipo">
            <img src={logoImg} alt="VANS" data-header-logo-img />
          </Link>

          <nav data-header-nav>
            <Flex justify="center" align="flex-end">
              <Flex align="center" data-header-nav-links>
                {mainMenuItems.map((item) => (
                  item.isHighlight ? (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      data-header-nav-link="highlight"
                    >
                      <Flex align="center" gap="2">
                        <Text variant="action">{item.label}</Text>
                        {item.hasDropdown && <IconArrowDown data-header-dropdown-icon />}
                      </Flex>
                    </Link>
                  ) : (
                    <Flex key={item.href} align="center" gap="2" data-header-nav-link>
                      <Text variant="action">{item.label}</Text>
                      {item.hasDropdown && <IconArrowDown data-header-dropdown-icon />}
                    </Flex>
                  )
                ))}
              </Flex>
            </Flex>
          </nav>

          <Flex gap="24" shrink="0" align="center" data-header-actions>
            <Flex direction="column" gap="6" align="flex-end" data-header-search-top-container>
              <Flex gap="24" align="center" data-header-top-menu>
                {topMenuItems.map((item) => (
                  <Link key={item.href} href={item.href} data-header-top-menu-link>
                    <Flex align="center" gap="2">
                      {item.icon === 'download' && <IconCloudArrowUp />}
                      {item.icon === 'map' && <IconMapPin />}
                      {item.icon === 'headset' && <IconHeadset />}
                      <Text variant="caption2">{item.label}</Text>
                    </Flex>
                  </Link>
                ))}
              </Flex>

              <Flex align="center" data-header-search-container>
                <Flex align="center" data-header-search-wrapper>
                  <input
                    type="text"
                    placeholder="O que você procura?"
                    data-header-search-input
                  />
                  <IconButton
                    label="Search"
                    data-header-search-button
                  >
                    <IconMagnifyingGlass />
                  </IconButton>
                </Flex>
              </Flex>
            </Flex>

            <IconButton
              asChild
              label="My Account"
              data-header-icon-button
            >
              <Link href="/conta">
                <IconUser />
              </Link>
            </IconButton>

            <IconButton
              asChild
              label="Wishlist"
              data-header-icon-button
            >
              <Link href="/wishlist">
                <IconHeart />
              </Link>
            </IconButton>

            <IconButton
              asChild
              label="Cart"
              data-header-icon-button
              data-header-cart-button
            >
              <Link href="/carrinho" data-header-cart-link>
                <Flex align="center" gap="2">
                  <IconShoppingCartSimple />
                  <Text variant="caption2" data-header-cart-count>(0)</Text>
                </Flex>
              </Link>
            </IconButton>

            <input type="checkbox" id="menu-toggle" data-header-menu-toggle-input />
            <label htmlFor="menu-toggle" data-header-menu-toggle-label>
              <Flex data-header-menu-toggle>
                <IconList data-header-menu-icon-open />
                <IconX data-header-menu-icon-close />
              </Flex>
            </label>
          </Flex>
        </Flex>
      </Container>

      <nav data-header-mobile-nav>
        <Flex direction="column" gap="4">
          {mainMenuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-header-mobile-nav-link
            >
              <Text variant="action">{item.label}</Text>
            </Link>
          ))}
        </Flex>
      </nav>
    </header>
  )
}
