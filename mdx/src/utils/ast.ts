import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkStringify from 'remark-stringify'
import { Root } from 'mdast'
import { createProcessor, createStringifier } from './processor'
import { wrapError } from './error'

export const parseToAST = async (mdxContent: string): Promise<Root> => {
  try {
    const processor = createProcessor()
    const file = await processor.process(mdxContent)
    const ast = file.data.ast as Root | undefined

    if (!ast) {
      return processor.parse(mdxContent) as Root
    }

    return ast
  } catch (error: unknown) {
    throw wrapError(error, 'Failed to parse MDX content to AST')
  }
}

export const astToString = (ast: Root): string => {
  try {
    const stringifier = createStringifier()
    return stringifier.stringify(ast)
  } catch (error: unknown) {
    throw wrapError(error, 'Failed to convert AST to string')
  }
}