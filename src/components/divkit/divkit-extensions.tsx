import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import {
  Flex,
  Link,
  IconButton,
  IconMagnifyingGlass,
  IconMapPin,
  IconHeadset,
  IconArrowDown,
  IconCloudArrowUp,
  IconUser,
  IconHeart,
  IconShoppingCartSimple,
  Text,
  Container,
} from '@vtex/shoreline'
import type { CustomComponentDescription } from '@divkitframework/divkit/typings/custom'

const iconMap: Record<string, React.ComponentType> = {
  magnifyingGlass: IconMagnifyingGlass,
  mapPin: IconMapPin,
  headset: IconHeadset,
  arrowDown: IconArrowDown,
  cloudArrowUp: IconCloudArrowUp,
  user: IconUser,
  heart: IconHeart,
  shoppingCartSimple: IconShoppingCartSimple,
}

function createReactWebComponent(
  Component: React.ComponentType<any>,
  parseProps?: (props: any) => any
) {
  return class extends HTMLElement {
    private root: Root | null = null

    connectedCallback() {
      const props: any = {}
      
      for (let i = 0; i < this.attributes.length; i++) {
        const attr = this.attributes[i]
        const name = attr.name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        props[name] = attr.value
      }

      const divkitProps = (this as any).__divkitProps
      if (divkitProps) {
        Object.assign(props, divkitProps)
      }

      const finalProps = parseProps ? parseProps(props) : props

      this.root = createRoot(this)
      this.root.render(React.createElement(Component, finalProps, this.innerHTML))
    }

    disconnectedCallback() {
      if (this.root) {
        this.root.unmount()
        this.root = null
      }
    }
  }
}

export function registerShorelineComponents() {
  if (!customElements.get('shoreline-flex')) {
    customElements.define(
      'shoreline-flex',
      createReactWebComponent((props: any) => {
        const { children, direction, gap, align, justify, wrap, ...rest } = props
        return (
          <Flex
            direction={direction}
            gap={gap}
            align={align}
            justify={justify}
            wrap={wrap}
            {...rest}
          >
            {children}
          </Flex>
        )
      })
    )
  }

  if (!customElements.get('shoreline-text')) {
    customElements.define(
      'shoreline-text',
      createReactWebComponent((props: any) => {
        const { variant, children, text, ...rest } = props
        return (
          <Text variant={variant} {...rest}>
            {text || children}
          </Text>
        )
      })
    )
  }

  if (!customElements.get('shoreline-link')) {
    customElements.define(
      'shoreline-link',
      createReactWebComponent((props: any) => {
        const { href, children, ...rest } = props
        return (
          <Link href={href} {...rest}>
            {children}
          </Link>
        )
      })
    )
  }

  if (!customElements.get('shoreline-container')) {
    customElements.define(
      'shoreline-container',
      createReactWebComponent((props: any) => {
        const { children, ...rest } = props
        return <Container {...rest}>{children}</Container>
      })
    )
  }

  if (!customElements.get('shoreline-icon')) {
    customElements.define(
      'shoreline-icon',
      createReactWebComponent((props: any) => {
        const { name, ...rest } = props
        const IconComponent = iconMap[name]
        if (!IconComponent) {
          console.warn(`Ícone "${name}" não encontrado no mapeamento`)
          return null
        }
        return React.createElement(IconComponent, rest)
      })
    )
  }

  if (!customElements.get('shoreline-icon-button')) {
    customElements.define(
      'shoreline-icon-button',
      createReactWebComponent((props: any) => {
        const { label, icon, children, ...rest } = props
        const IconComponent = icon ? iconMap[icon] : null
        return (
          <IconButton label={label} {...rest}>
            {IconComponent ? React.createElement(IconComponent) : children}
          </IconButton>
        )
      })
    )
  }
}

export const divkitCustomComponents: Map<string, CustomComponentDescription> = new Map([
  ['shoreline-flex', { element: 'shoreline-flex' }],
  ['shoreline-text', { element: 'shoreline-text' }],
  ['shoreline-link', { element: 'shoreline-link' }],
  ['shoreline-container', { element: 'shoreline-container' }],
  ['shoreline-icon', { element: 'shoreline-icon' }],
  ['shoreline-icon-button', { element: 'shoreline-icon-button' }],
])
