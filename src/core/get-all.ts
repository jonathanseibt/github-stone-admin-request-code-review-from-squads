interface IGetAll {
  (selector: string): Array<HTMLElement>
}

const getAll: IGetAll = (selector: string): ReturnType<IGetAll> => [...document.querySelectorAll<HTMLElement>(selector)]

export { getAll }
