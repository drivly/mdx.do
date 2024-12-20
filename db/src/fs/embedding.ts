import { EmbeddingModel } from '../types'
import { openai } from '@ai-sdk/openai'

// Default embedding model using OpenAI's text-embedding-3-large
export const defaultEmbeddingModel: EmbeddingModel = {
  model: 'text-embedding-3-large',
  dimensions: 256,
  
  async embed(text: string): Promise<number[]> {
    const model = openai.embedding(this.model, { dimensions: this.dimensions })
    const { embedding } = await model.embed(text)
    return embedding
  },
  
  async embedBatch(texts: string[]): Promise<number[][]> {
    const model = openai.embedding(this.model, { dimensions: this.dimensions })
    const embeddings = await Promise.all(
      texts.map(text => model.embed(text).then(r => r.embedding))
    )
    return embeddings
  }
}