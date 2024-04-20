import { get } from '../core'

export function getAuthor(): { user: number } | null {
  const avatar = get('.pull-discussion-timeline > .js-discussion > .TimelineItem .TimelineItem-avatar img')
  if (!avatar) return null

  const src = avatar.getAttribute('src')
  if (!src) return null

  const match = src.match(/\/u\/(\d+)/)
  if (!match) return null

  const user = Number(match[1])

  return { user }
}
