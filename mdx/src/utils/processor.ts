import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkStringify from 'remark-stringify'

export const createProcessor = () => {
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkMdxFrontmatter)
    .use(remarkStringify)
}

export const createStringifier = () => {
  return unified()
    .use(remarkStringify)
    .use(remarkMdx)
    .use(remarkMdxFrontmatter)
}