import * as yaml from 'yaml'

export const extractFrontmatter = (mdxContent: string): Record<string, any> => {
  const match = mdxContent.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  try {
    return yaml.parse(match[1])
  } catch (e) {
    return {}
  }
}

export const createFrontmatterString = (data: Record<string, any>): string => {
  return Object.keys(data).length > 0 ? `---\n${yaml.stringify(data)}---\n\n` : ''
}

export const updateFrontmatter = (mdxContent: string, newData: Record<string, any>): string => {
  const hasFrontmatter = mdxContent.startsWith('---\n')
  if (!hasFrontmatter) {
    return `${createFrontmatterString(newData)}${mdxContent}`
  }
  return mdxContent.replace(/^---\n[\s\S]*?\n---\n/, `---\n${yaml.stringify(newData)}---\n`)
}