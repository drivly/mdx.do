import { MDXResult, MDXInput } from './types'
import { processString } from './processors/string'
import { processObject } from './processors/object'
import { registerComponent, getComponent, getAllComponents } from './utils/components'

export async function mdx(input: string | MDXInput): Promise<MDXResult> {
  if (typeof input === 'string') {
    return processString(input)
  }
  return processObject(input)
}

export { registerComponent, getComponent, getAllComponents }
export type { MDXResult, MDXInput }