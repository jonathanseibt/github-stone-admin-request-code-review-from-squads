interface IGet<T extends HTMLElement = HTMLElement> {
  (selector: string): T | null
}

const get: IGet = <T extends HTMLElement>(selector: string): ReturnType<IGet> => document.querySelector<T>(selector)

export { get }
