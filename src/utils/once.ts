import { get } from '.'

interface IOnce {
  (event: 'find' | 'mount' | 'unmount', selector: string, callback: (element: HTMLElement) => void): void
}

const once: IOnce = (event, selector, callback): ReturnType<IOnce> => {
  let element: HTMLElement | null = null

  if (event === 'find' || event === 'unmount') element = get(selector)

  if (event === 'find' && element) return callback(element)

  new MutationObserver((records: Array<MutationRecord>, observer: MutationObserver): void => {
    const mutations = records.filter((record): boolean => record.type === 'childList').reverse()

    let nodes: Array<Node> = []

    switch (event) {
      case 'find':
        nodes = mutations
          .map((mutation): Node => mutation.target)
          .filter(
            (node): boolean =>
              !mutations.flatMap((mutation): Array<Node> => Array.from(mutation.removedNodes)).includes(node),
          )

        break
      case 'mount':
        nodes = mutations.flatMap((mutation): Array<Node> => Array.from(mutation.addedNodes))

        break
      case 'unmount':
        nodes = mutations.flatMap((mutation): Array<Node> => Array.from(mutation.removedNodes))

        break
    }

    const elements = nodes.filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)

    switch (event) {
      case 'find':
      case 'mount':
        element = elements.find((found): boolean => found.matches(selector)) || null
        break
      case 'unmount':
        element = elements.find((found): boolean => found === element) || null
        break
    }

    if (element) callback(element), observer.disconnect()
  }).observe(document, { childList: true, subtree: true })
}

export { once }
