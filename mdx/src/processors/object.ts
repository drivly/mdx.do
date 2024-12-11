import { MDXInput, MDXResult } from '../types'
import { createFrontmatterString } from '../utils/frontmatter'
import { astToString } from '../utils/ast'
import { createJSXString } from '../utils/jsx'
import { processString } from './string'
import { wrapError } from '../utils/error'

export const processObject = async (input: MDXInput): Promise<MDXResult> => {
  try {
    const { jsx, data = {}, ast, mdx: mdxString } = input

    if (mdxString) {
      return processString(mdxString)
    }

    if (ast) {
      const mdxContent = astToString(ast)
      return processString(mdxContent)
    }

    if (jsx) {
      const frontmatter = createFrontmatterString(data)
      const jsxString = createJSXString(jsx)
      return processString(`${frontmatter}${jsxString}`)
    }

    throw new Error('Invalid input: Must provide either mdx string, ast, or jsx component')
  } catch (error: unknown) {
    throw wrapError(error, 'Failed to process MDX object')
  }
}