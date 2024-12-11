import deepmerge from 'deepmerge'
import { updateFrontmatter } from './frontmatter'
import { processString } from '../processors/string'
import type { MDXResult } from '../types'

export const createMerger = (mdxContent: string, data: Record<string, any>) => {
  return async (update: Record<string, any>): Promise<MDXResult> => {
    const newData = deepmerge(data, update)
    const newMdx = updateFrontmatter(mdxContent, newData)
    return processString(newMdx)
  }
}