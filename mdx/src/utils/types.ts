import type { VFile } from 'vfile'
import type { ComponentType, Fragment } from 'react'

export interface CompileOptions {
  outputFormat: 'function-body'
  development: boolean
  pragma: string
  pragmaFrag: string
  providerImportSource?: string
}

export interface EvaluateOptions {
  baseUrl: string
  Fragment: typeof Fragment
  scope?: Record<string, unknown>
  development?: boolean
}

export interface CompileResult {
  compiled: VFile
  components: Record<string, ComponentType<any>>
}

export interface EvaluateResult {
  default: ComponentType<any>
  [key: string]: any
}