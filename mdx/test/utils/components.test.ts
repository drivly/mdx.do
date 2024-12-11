import { expect, test, describe } from 'vitest'
import { registerComponent, getComponent, getAllComponents } from '../../src/utils/components'
import * as React from 'react'

describe('Component Utils', () => {
  test('registers and retrieves components', () => {
    const Button = () => React.createElement('button', null, 'Click me')
    registerComponent('Button', Button)
    
    expect(getComponent('Button')).toBe(Button)
    expect(getAllComponents()).toHaveProperty('Button')
  })

  test('returns undefined for unknown components', () => {
    expect(getComponent('Unknown')).toBeUndefined()
  })
})