import { expect, test, describe } from 'vitest'
import { extractFrontmatter, createFrontmatterString, updateFrontmatter } from '../../src/utils/frontmatter'

describe('Frontmatter Utils', () => {
  test('extractFrontmatter', () => {
    const input = `---
title: Test
---
content`
    expect(extractFrontmatter(input)).toEqual({ title: 'Test' })
  })

  test('createFrontmatterString', () => {
    const data = { title: 'Test' }
    expect(createFrontmatterString(data)).toContain('title: Test')
  })

  test('updateFrontmatter', () => {
    const input = `---
title: Test
---
content`
    const newData = { title: 'Updated' }
    const result = updateFrontmatter(input, newData)
    expect(result).toContain('title: Updated')
  })
})