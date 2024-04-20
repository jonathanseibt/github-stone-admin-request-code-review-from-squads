import { getAll } from '.'

export function get(selector: string): HTMLElement | null {
  return getAll(selector)[0] || null
}
