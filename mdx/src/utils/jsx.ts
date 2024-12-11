import type { ComponentType } from 'react'

export const createJSXString = (jsx: ComponentType<any>): string => {
  if (typeof jsx !== 'function') {
    throw new Error('JSX must be a function component or class component')
  }

  if (jsx.prototype?.isReactComponent) {
    return `export default class extends React.Component {
      render() {
        return ${jsx.toString()}
      }
    }`
  }

  return `export default ${jsx.toString()}`
}