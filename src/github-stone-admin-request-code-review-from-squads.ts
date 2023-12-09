import { event, get, once } from './utils'

interface ISquad {
  id: `squad-${string}`
  name: `Squad ${string}`
  members: Array<{
    user: number
    name: string
  }>
}

// IIFE
;((): void => {
  const SELECTORS = {
    MENU: '[data-menu-trigger="reviewers-select-menu"]',
    LIST: '[data-filterable-for="review-filter-field"]',
    LOADER: '[role="reviewers"] > svg',
    CREATOR: '.pull-discussion-timeline > .js-discussion > .TimelineItem .TimelineItem-avatar img',
    getRequestedReviewer: (user: number): string => `[role="reviewers"] input[value="${user}"]:checked`,
    getNotRequestedReviewer: (user: number): string => `[role="reviewers"] input[value="${user}"]:not(:checked)`,
  } as const

  const squads: Array<ISquad> = [
    {
      id: 'squad-payments-lifecycle',
      name: 'Squad Payments & Lifecycle',
      members: [
        { name: 'Amandinha', user: 71740023 },
        { name: 'Ka', user: 3419801 },
        { name: 'Pitta', user: 21087503 },
        { name: 'Seibt', user: 56838120 },
        { name: 'Sidney', user: 76785419 },
      ],
    },
    {
      id: 'squad-risk-stoneaccount',
      name: 'Squad Risk & Stone Account',
      members: [
        { name: 'Breno', user: 29927043 },
        { name: 'Ermerson', user: 95234159 },
        { name: 'Guh', user: 24482087 },
        { name: 'Matheus', user: 21129795 },
      ],
    },
    {
      id: 'squad-banking-credit-insurance',
      name: 'Squad Banking & Credit & Insurance',
      members: [
        { name: 'Gustavo', user: 61552991 },
        { name: 'Malê', user: 56513919 },
        { name: 'Phelipe', user: 22174013 },
        { name: 'Thiagão', user: 65300263 },
        { name: 'Vini', user: 17788722 },
      ],
    },
    {
      id: 'squad-platform-ux',
      name: 'Squad Platform & UX',
      members: [
        { name: 'João', user: 69815066 },
        { name: 'Lucas', user: 7409802 },
        { name: 'Paulinho', user: 17968732 },
      ],
    },
  ]

  const html = (squad: ISquad): string => {
    let html = ''
    html += `<label id="${squad.id}" class="select-menu-item text-normal" role="menuitemcheckbox" aria-checked="true" tabindex="0" style="padding: 8px;">`
    html += '  <div class="select-menu-item-text" style="pointer-events: none;">'
    html += '    <span class="select-menu-item-heading">'
    html += `      <span class="js-username">${squad.name}</span>`
    html += '      <span class="description d-block js-extended-description">'
    html += `        ${squad.members.map((member): string => member.name).join(', ')}`
    html += '      </span>'
    html += '    </span>'
    html += '  </div>'
    html += '</label>'
    return html
  }

  const request = (squad: ISquad): void => {
    const creator = Number(
      get(SELECTORS.CREATOR)!
        .getAttribute('src')!
        .match(/\/u\/(\d+)/)![1],
    )

    const users = squad.members.map((member): number => member.user).filter((member): boolean => member !== creator)

    const alreadyRequestedUsers = users.filter((user): boolean => !!get(SELECTORS.getRequestedReviewer(user)))

    if (users.length === alreadyRequestedUsers.length) {
      users.forEach((user): void => get(SELECTORS.getRequestedReviewer(user))?.click())
    } else {
      users.forEach((user): void => get(SELECTORS.getNotRequestedReviewer(user))?.click())
    }
  }

  event('click', SELECTORS.MENU, (menu): void => {
    once('find', SELECTORS.LIST, (list): void => {
      list.setAttribute('role', 'reviewers')
      list.removeAttribute('data-filterable-limit')

      once('unmount', SELECTORS.LOADER, (): void => {
        list.insertAdjacentHTML('afterbegin', squads.map((squad): string => html(squad)).join(''))
        squads.forEach((squad): void => event('click', `#${squad.id}`, (): void => (request(squad), menu.click())))
      })
    })
  })
})()
