import { expect, test, describe } from 'vitest'
import { processImports, resolveImports } from '../../src/utils/imports'
import { registerComponent } from '../../src/utils/components'
import * as React from 'react'

describe('Import Utils', () => {
  test('processes import statements', () => {
    const input = `
import { Button } from './components'
# Hello
<Button>Click me</Button>
`
    const { content, imports } = processImports(input)
    expect(imports).toHaveProperty('Button', './components')
    expect(content).not.toContain('import')
  })

  test('resolves registered components', () => {
    const Button = () => React.createElement('button', null, 'Click me')
    registerComponent('Button', Button)
    
    const imports = { Button: './components' }
    const components = resolveImports(imports)
    expect(components).toHaveProperty('Button', Button)
  })
})