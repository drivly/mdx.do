import { expect, test, describe } from 'vitest'
import { mdx } from '../src/index'
import * as React from 'react'
import { registerComponent } from '../src/utils/components'

describe('MDX Processor', () => {
  test('processes simple MDX string', async () => {
    const input = `---
title: Test
---

# Hello World`

    const result = await mdx(input)
    expect(result.data).toEqual({ title: 'Test' })
    expect(result.mdx).toBe(input)
    expect(result.ast).toBeDefined()
    expect(typeof result.default).toBe('function')
  })

  test('merges frontmatter data', async () => {
    const input = `---
title: Test
---

# Hello World`

    const result = await mdx(input)
    const merged = await result.merge({ author: 'John' })
    expect(merged.data).toEqual({ title: 'Test', author: 'John' })
  })

  test('appends content', async () => {
    const input = `# Hello`
    const result = await mdx(input)
    const appended = await result.append('## World')
    expect(appended.mdx).toContain('# Hello')
    expect(appended.mdx).toContain('## World')
  })

  test('handles object input with data', async () => {
    const HelloWorld = () => React.createElement('div', null, 'Hello World')
    
    const input = {
      jsx: HelloWorld,
      data: { title: 'Test' },
    }

    const result = await mdx(input)
    expect(result.data).toEqual({ title: 'Test' })
    expect(typeof result.default).toBe('function')
  })

  test('handles MDX with components', async () => {
    const Button = () => React.createElement('button', null, 'Click me')
    registerComponent('Button', Button)

    const input = `
import { Button } from './components'

# Hello

<Button>Click me</Button>
`
    const result = await mdx(input)
    expect(typeof result.default).toBe('function')
  })
})