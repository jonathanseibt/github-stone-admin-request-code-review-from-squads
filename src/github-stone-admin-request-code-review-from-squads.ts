;((): void => {
  const REVIEWERS = {
    Amandinha: 71740023,
    Breno: 29927043,
    Ermerson: 95234159,
    Guh: 24482087,
    Hoffmann: 37714181,
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
    Thiago: 65300263,
    Vini: 17788722,
  } as const

  event('click', '[data-menu-trigger=reviewers-select-menu]', (): void => {
    whenShow('#reviewers-select-menu .select-menu-list div[data-filterable-limit]', (element): void => {
      element.removeAttribute('data-filterable-limit')
    })

    whenHide('#reviewers-select-menu .select-menu-list svg.anim-rotate', (): void => {
      whenShow('#reviewers-select-menu > details-menu .select-menu-list', (element): void => {
        if (!get('#squad-platform-ux-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-platform-ux-button', 'Squad Platform & UX', 'João, Lucas, Paulinho, Vini') + element.innerHTML
          event('click', '#squad-platform-ux-button', (): void => requestCodeReviewFrom([REVIEWERS.Joao, REVIEWERS.Lucas, REVIEWERS.Paulinho, REVIEWERS.Vini]))
        }

        if (!get('#squad-banking-capital-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-banking-capital-button', 'Squad Banking & Capital', 'Hoffmann, Malê, Phelipe, Thiago, Vini') + element.innerHTML
          event('click', '#squad-banking-capital-button', (): void => requestCodeReviewFrom([REVIEWERS.Hoffmann, REVIEWERS.Male, REVIEWERS.Phelipe, REVIEWERS.Thiago, REVIEWERS.Vini]))
        }

        if (!get('#squad-risk-lifecycle-button')) {
          element.innerHTML = buildReviewersButtonHtml('squad-risk-lifecycle-button', 'Squad Risk & Lifecycle', 'Breno, Ermerson, Guh, Matheus') + element.innerHTML
          event('click', '#squad-risk-lifecycle-button', (): void => requestCodeReviewFrom([REVIEWERS.Breno, REVIEWERS.Ermerson, REVIEWERS.Guh, REVIEWERS.Matheus]))
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
      'show',
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
      'hide',
      (listened): boolean => listened === element,
      (): void => callback(),
    )
  }

  /**
   * Listen to DOM changes and trigger a custom callback based on custom criteria.
   */
  function listen(type: 'show' | 'hide', criteria: (element: HTMLElement) => boolean, callback: (element: HTMLElement) => void): void {
    const observer = new MutationObserver(observe)
    observer.observe(document, { childList: true, subtree: true })

    function observe(mutationRecords: MutationRecord[]): void {
      const mutations = mutationRecords.filter((mutation): boolean => mutation.type === 'childList')
      const nodes = type === 'show' ? mutations.map((mutation): Node => mutation.target) : type === 'hide' ? mutations.flatMap((mutation): Node[] => Array.from(mutation.removedNodes)) : []
      const elements = nodes.filter((node): boolean => node.nodeType === Node.ELEMENT_NODE) as Array<HTMLElement>
      const element = elements.find(criteria)

      if (element) {
        callback(element)
        observer.disconnect()
      }
    }
  }
})()
