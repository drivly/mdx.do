import * as React from 'react'
import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import type { VFile } from 'vfile'
import type { ComponentType } from 'react'
import type { EvaluateResult, EvaluateOptions } from './types'
import { wrapError } from './error'

export const evaluate = async (
  compiled: VFile,
  data: Record<string, any> = {},
  components: Record<string, ComponentType<any>> = {}
): Promise<EvaluateResult> => {
  try {
    const scope = {
      ...data,
      ...components,
      React,
      ...runtime
    }

    const options: EvaluateOptions = {
      ...runtime,
      Fragment: React.Fragment,
      baseUrl: import.meta.url,
      scope,
      development: false
    }

    const evaluated = await run(compiled, options)

    return {
      ...evaluated,
      default: evaluated.default || (() => null)
    }
  } catch (error: unknown) {
    throw wrapError(error, 'Failed to evaluate MDX content')
  }
}