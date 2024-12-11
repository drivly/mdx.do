import { compile as mdxCompile } from '@mdx-js/mdx'
import { processImports, resolveImports } from './imports'
import type { VFile } from 'vfile'
import type { CompileResult, CompileOptions } from './types'
import { wrapError } from './error'

export const compile = async (mdxContent: string): Promise<CompileResult> => {
  try {
    const { content, imports } = processImports(mdxContent)
    const components = resolveImports(imports)

    const options: CompileOptions = {
      outputFormat: 'function-body',
      development: false,
      pragma: 'React.createElement',
      pragmaFrag: 'React.Fragment',
      providerImportSource: '@mdx-js/react'
    }

    const compiled = await mdxCompile(content, options) as VFile

    return { compiled, components }
  } catch (error: unknown) {
    throw wrapError(error, 'Failed to compile MDX content')
  }
}