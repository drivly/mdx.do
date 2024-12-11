import { MDXResult } from '../types'
import { extractFrontmatter } from '../utils/frontmatter'
import { parseToAST } from '../utils/ast'
import { compile } from '../utils/compiler'
import { evaluate } from '../utils/evaluator'
import { createMerger } from '../utils/merger'
import { createAppender } from '../utils/appender'
import { wrapError } from '../utils/error'

export const processString = async (mdxContent: string): Promise<MDXResult> => {
  try {
    const data = extractFrontmatter(mdxContent)
    const ast = await parseToAST(mdxContent)
    const { compiled, components } = await compile(mdxContent)
    const evaluated = await evaluate(compiled, data, components)

    const result: MDXResult = {
      mdx: mdxContent,
      data,
      ast,
      default: evaluated.default,
      markdown: evaluated.default,
      merge: createMerger(mdxContent, data),
      append: createAppender(mdxContent)
    }

    const { default: _, ...evaluatedRest } = evaluated
    return { ...result, ...evaluatedRest }
  } catch (error: unknown) {
    throw wrapError(error, 'Failed to process MDX string')
  }
}