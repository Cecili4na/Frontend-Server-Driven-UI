import React from 'react'
import { Header } from '../../components/header/header'
import { Shelf } from '../../components/shelf/shelf'

const componentRegistry = new Map<string, React.ComponentType<any>>()

componentRegistry.set('Header', Header)
componentRegistry.set('Shelf', Shelf)

export function getComponent(componentName: string): React.ComponentType<any> | null {
  return componentRegistry.get(componentName) || null
}

export function registerComponent(name: string, component: React.ComponentType<any>): void {
  componentRegistry.set(name, component)
}
