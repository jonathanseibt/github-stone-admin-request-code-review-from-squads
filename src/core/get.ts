import { getAll } from '.'

interface IGet {
  (selector: string): HTMLElement | null
}

const get: IGet = (selector: string): ReturnType<IGet> => getAll(selector)[0] || null

export { get }
