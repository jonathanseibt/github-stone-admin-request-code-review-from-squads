import { event, get, observe } from './core'
import { getAuthor, getSquads, ISquad } from './util'

function request(squad: ISquad): void {
  const author = getAuthor()
  if (!author) return

  const users = squad.members.map((member): number => member.user).filter((user): boolean => user !== author.user)
  const reviewers = users.filter((user): boolean =>
    Boolean(get(`[data-reviewers-team-size-check-url] > span img[src*="u/${user}?"]`)),
  )
  const allUsersAreAlreadyRequested = users.length === reviewers.length
  const shouldUnrequest = allUsersAreAlreadyRequested

  users.map((user): void => {
    const reviewer = get(
      `[data-filterable-for="review-filter-field"] input[value="${user}"]${shouldUnrequest ? ':checked' : ':not(:checked)'}`,
    )
    if (!reviewer) return

    reviewer.click()
  })
}

function html(squad: ISquad): string {
  let html = ''

  html += `<label id="${squad.id}" class="select-menu-item text-normal" role="menuitemcheckbox" aria-checked="true" tabindex="0" style="padding: 6px 0 6px 6px; border-radius: 0; border-bottom: 1px solid var(--borderColor-muted, var(--color-border-muted));">`
  html += '  <div class="select-menu-item-text" style="pointer-events: none;">'
  html += '    <span class="select-menu-item-heading">'
  html += `      <span class="js-username">${squad.name}</span>`
  html += '      <span class="description d-block js-extended-description" style="max-width: unset; font-size: 10px;">'
  html += `        ${squad.members.map((member): string => member.name).join(', ')}`
  html += '      </span>'
  html += '    </span>'
  html += '  </div>'
  html += '</label>'

  return html
}

observe(['find', 'change'], '[data-filterable-for="review-filter-field"]', (element): void => {
  if (!element.hasAttribute('data-filterable-limit')) return

  element.removeAttribute('data-filterable-limit')
})

observe('remove', 'svg.anim-rotate', (): void => {
  observe(['find', 'change'], '[data-filterable-for="review-filter-field"]', (element): void => {
    if (get('[role="stone-admin"]')) return

    element.insertAdjacentHTML(
      'afterbegin',
      `<div role="stone-admin">${getSquads()
        .map((squad): string => html(squad))
        .join('')}</div>`,
    )

    getSquads().map((squad): void =>
      event('click', `#${squad.id}`, (): void => {
        request(squad)

        const menu = get('[data-menu-trigger="reviewers-select-menu"]')
        if (!menu) return

        menu.click()
      }),
    )
  })
})
