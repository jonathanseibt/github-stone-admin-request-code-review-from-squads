import { getAll } from '.'

type IObserveEvent = 'find' | 'change' | 'add' | 'remove'

export function observe(
  events: IObserveEvent | Array<IObserveEvent>,
  selector: string,
  callback: (elements: HTMLElement) => void,
): void {
  if (!Array.isArray(events)) events = [events]

  events.map((event): void => {
    let elements: Array<HTMLElement> = []

    if (event === 'find' || event === 'remove') elements = getAll(selector)

    if (event === 'find' && elements?.length) {
      elements.map((element): void => callback(element))

      return
    }

    new MutationObserver((records: Array<MutationRecord>, observer: MutationObserver): void => {
      const mutations = records.filter((record): boolean => record.type === 'childList')

      let nodes: Array<Node> = []
      switch (event) {
        case 'find':
        case 'change':
          nodes = mutations.map((mutation): Node => mutation.target)
          break
        case 'add':
          nodes = mutations.flatMap((mutation): Array<Node> => Array.from(mutation.addedNodes))
          break
        case 'remove':
          nodes = mutations.flatMap((mutation): Array<Node> => Array.from(mutation.removedNodes))
          break
      }

      elements = nodes
        .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
        .filter((found): boolean => found.matches(selector))
      if (!elements?.length) return

      elements.map((element): void => callback(element))
      if (event !== 'find') return

      observer.disconnect()
    }).observe(document, { childList: true, subtree: true })
  })
}
