import { processString } from '../processors/string'
import type { MDXResult } from '../types'

export const createAppender = (mdxContent: string) => {
  return async (content: string): Promise<MDXResult> => {
    return processString(`${mdxContent}\n\n${content}`)
  }
}