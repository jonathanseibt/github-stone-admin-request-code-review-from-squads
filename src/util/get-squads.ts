export interface ISquad {
  id: `squad-${string}`
  name: string
  members: Array<{
    user: number
    name: string
  }>
}

const SQUADS: Array<ISquad> = [
  {
    id: 'squad-payments-lifecycle-credit',
    name: 'Payments & Lifecycle & Credit',
    members: [
      { name: 'Amandinha', user: 71740023 },
      { name: 'Ka', user: 3419801 },
      { name: 'Phelipe', user: 22174013 },
      { name: 'Pitta', user: 21087503 },
      { name: 'Seibt', user: 56838120 },
      { name: 'Sidney', user: 76785419 },
    ],
  },
  {
    id: 'squad-risk-identity-banking-insurance',
    name: 'Risk & Identity & Banking & Insurance',
    members: [
      { name: 'Breno', user: 29927043 },
      { name: 'Ermerson', user: 95234159 },
      { name: 'Giovani', user: 79429654 },
      { name: 'Guh', user: 24482087 },
      { name: 'Malê', user: 56513919 },
      { name: 'Matheus', user: 21129795 },
      { name: 'Thiagão', user: 65300263 },
      { name: 'Vini', user: 17788722 },
    ],
  },
  {
    id: 'squad-platform',
    name: 'Platform',
    members: [
      { name: 'João', user: 69815066 },
      { name: 'Lucas', user: 7409802 },
      { name: 'Paulinho', user: 17968732 },
    ],
  },
] as const

export function getSquads(): typeof SQUADS {
  return SQUADS
}
