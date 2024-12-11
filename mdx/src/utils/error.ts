export class MDXProcessingError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message)
    this.name = 'MDXProcessingError'
  }
}

export const wrapError = (error: unknown, context: string): MDXProcessingError => {
  if (error instanceof MDXProcessingError) {
    return error
  }
  
  const message = error instanceof Error ? error.message : String(error)
  return new MDXProcessingError(`${context}: ${message}`, error)
}