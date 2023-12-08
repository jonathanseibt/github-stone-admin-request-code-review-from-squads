;((): void => {
  const REVIEWERS = {
    Amandinha: 71740023,
    Breno: 29927043,
    Ermerson: 95234159,
    Guh: 24482087,
    Gustavo: 61552991,
    Joao: 69815066,
    Ka: 3419801,
    Lucas: 7409802,
    Male: 56513919,
    Matheus: 21129795,
    Paulinho: 17968732,
    Phelipe: 22174013,
    Pitta: 21087503,
    Seibt: 56838120,
    Sidney: 76785419,
    Thiagao: 65300263,
    Vini: 17788722,
  } as const

  event('click', '[data-menu-trigger=reviewers-select-menu]', (): void => {
    whenShow('#reviewers-select-menu .select-menu-list div[data-filterable-limit]', (element): void => {
      element.removeAttribute('data-filterable-limit')
    })

    whenHide('#reviewers-select-menu .select-menu-list svg.anim-rotate', (): void => {
      whenShow('#reviewers-select-menu > details-menu .select-menu-list', (element): void => {
        if (!get('#squad-platform-ux-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-platform-ux-button', 'Squad Platform & UX', 'João, Lucas, Paulinho') + element.innerHTML
          event('click', '#squad-platform-ux-button', (): void => requestCodeReviewFrom([REVIEWERS.Joao, REVIEWERS.Lucas, REVIEWERS.Paulinho]))
        }

        if (!get('#squad-banking-credit-insurance-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-banking-credit-insurance-button', 'Squad Banking & Credit & Insurance', 'Gustavo, Malê, Phelipe, Thiagão, Vini') + element.innerHTML
          event('click', '#squad-banking-credit-insurance-button', (): void => requestCodeReviewFrom([REVIEWERS.Gustavo, REVIEWERS.Male, REVIEWERS.Phelipe, REVIEWERS.Thiagao, REVIEWERS.Vini]))
        }

        if (!get('#squad-risk-stoneaccount-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-risk-stoneaccount-button', 'Squad Risk & Stone Account', 'Breno, Ermerson, Guh, Matheus') + element.innerHTML
          event('click', '#squad-risk-stoneaccount-button', (): void => requestCodeReviewFrom([REVIEWERS.Breno, REVIEWERS.Ermerson, REVIEWERS.Guh, REVIEWERS.Matheus]))
        }

        if (!get('#squad-payments-lifecycle-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-payments-lifecycle-button', 'Squad Payments & Lifecycle', 'Amandinha, Ka, Pitta, Seibt, Sidney') + element.innerHTML
          event('click', '#squad-payments-lifecycle-button', (): void => requestCodeReviewFrom([REVIEWERS.Amandinha, REVIEWERS.Ka, REVIEWERS.Pitta, REVIEWERS.Seibt, REVIEWERS.Sidney]))
        }
      })
    })
  })

  function buildReviewersButtonHtml(id: string, label: string, description: string): string {
    let html = ''
    html += `<label id="${id}" class="select-menu-item text-normal" role="menuitemcheckbox" aria-checked="true" tabindex="0" style="padding: 8px;">`
    html += '  <div class="select-menu-item-text" style="pointer-events: none;">'
    html += '    <span class="select-menu-item-heading">'
    html += `      <span class="js-username">${label}</span>`
    html += `      <span class="description d-block js-extended-description">${description}</span>`
    html += '    </span>'
    html += '  </div>'
    html += '</label>'
    return html
  }

  function requestCodeReviewFrom(reviewers: Array<(typeof REVIEWERS)[keyof typeof REVIEWERS]>): void {
    reviewers.forEach((reviewer): void => {
      const button = get(`#reviewers-select-menu input[value="${reviewer}"]:not(:checked)`)
      if (button) button.click()
    })

    const menu = get('[data-menu-trigger=reviewers-select-menu]')
    if (menu) menu.click()
  }

  /**
   * CORE
   * =============== */

  /**
   * Attach persistent event on an element in the DOM.
   */
  function event(event: keyof DocumentEventMap, selector: string, callback: (element: HTMLElement) => void): void {
    document.addEventListener(event, (event): void => {
      if (!event.target) return

      const element = event.target as HTMLElement

      if (element.matches(selector)) callback(element)
    })
  }

  /**
   * Find element in the DOM already casted to HTMLElement, or returns null if not found.
   */
  function get(selector: string): HTMLElement | null {
    const element = document.querySelector(selector)

    return element ? (element as HTMLElement) : null
  }

  /**
   * Triggers a custom callback when an element is found in the DOM, or waits for it to be found.
   */
  function whenShow(selector: string, callback: (element: HTMLElement) => void): void {
    const element = get(selector)

    if (element) {
      callback(element)
      return
    }

    listen(
      'mount',
      (listened): boolean => listened.matches(selector),
      (listened): void => callback(listened),
    )
  }

  /**
   * Triggers a custom callback when an element is not found in the DOM, or waits for it not to be found anymore.
   */
  function whenHide(selector: string, callback: () => void): void {
    const element = get(selector)

    if (!element) {
      callback()
      return
    }

    listen(
      'unmount',
      (listened): boolean => listened === element,
      (): void => callback(),
    )
  }

  /**
   * Listen to DOM changes and trigger a custom callback based on custom criteria.
   */
  function listen(event: 'change' | 'mount' | 'unmount', criteria: (element: HTMLElement) => boolean, callback: (element: HTMLElement) => void): void {
    const mutation = (record: MutationRecord[]): void => {
      const mutations = record.filter((mutation): boolean => mutation.type === 'childList')

      let nodes: Node[] = []

      if (event === 'change') {
        nodes = mutations.map((mutation): Node => mutation.target)
      } else if (event === 'mount') {
        nodes = mutations.flatMap((mutation): Node[] => Array.from(mutation.addedNodes))
      } else if (event === 'unmount') {
        nodes = mutations.flatMap((mutation): Node[] => Array.from(mutation.removedNodes))
      }

      const elements = nodes.filter((node): boolean => node.nodeType === Node.ELEMENT_NODE) as Array<HTMLElement>

      const element = elements.find(criteria)

      if (element) {
        callback(element)

        observer.disconnect()
      }
    }

    const observer = new MutationObserver(mutation)

    observer.observe(document, { childList: true, subtree: true })
  }
})()
