import { getComponent } from './components'
import type { ComponentType } from 'react'

interface ImportResult {
  content: string
  imports: Record<string, string>
}

export const processImports = (mdxContent: string): ImportResult => {
  const imports: Record<string, string> = {}
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g
  
  const content = mdxContent.replace(importRegex, (_, components: string, path: string) => {
    const componentNames = components.split(',').map((c: string) => c.trim())
    componentNames.forEach((name: string) => {
      imports[name] = path
    })
    return '' // Remove import statements from content
  })

  return { content, imports }
}

export const resolveImports = (imports: Record<string, string>): Record<string, ComponentType<any>> => {
  const components: Record<string, ComponentType<any>> = {}
  
  Object.keys(imports).forEach((name: string) => {
    const component = getComponent(name)
    if (component) {
      components[name] = component
    }
  })

  return components
}