import type { ComponentType } from 'react'

// Default component registry
const componentRegistry: Record<string, ComponentType<any>> = {}

export const registerComponent = (name: string, component: ComponentType<any>): void => {
  componentRegistry[name] = component
}

export const getComponent = (name: string): ComponentType<any> | undefined => {
  return componentRegistry[name]
}

export const getAllComponents = (): Record<string, ComponentType<any>> => {
  return { ...componentRegistry }
}