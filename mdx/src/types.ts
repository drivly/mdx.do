import { Root } from 'mdast'
import { ComponentType } from 'react'

export interface MDXInput {
  jsx?: ComponentType<any>
  data?: Record<string, any>
  ast?: Root
  mdx?: string
}

export interface MDXResult {
  mdx: string
  data: Record<string, any>
  ast: Root
  default: ComponentType<any>
  markdown: ComponentType<any>
  merge: (update: Record<string, any>) => Promise<MDXResult>
  append: (content: string) => Promise<MDXResult>
  [key: string]: any
}