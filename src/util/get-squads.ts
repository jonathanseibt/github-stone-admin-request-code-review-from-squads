interface ISquad {
  id: `squad-${string}`
  name: `Squad ${string}`
  members: Array<{
    user: number
    name: string
  }>
}

const SQUADS: Array<ISquad> = [
  {
    id: 'squad-payments-lifecycle',
    name: 'Squad Payments & Lifecycle',
    members: [
      {
        name: 'Amandinha',
        user: 71740023,
      },
      {
        name: 'Ka',
        user: 3419801,
      },
      {
        name: 'Pitta',
        user: 21087503,
      },
      {
        name: 'Seibt',
        user: 56838120,
      },
      {
        name: 'Sidney',
        user: 76785419,
      },
    ],
  },
  {
    id: 'squad-risk-identity',
    name: 'Squad Risk & Identity',
    members: [
      {
        name: 'Breno',
        user: 29927043,
      },
      {
        name: 'Ermerson',
        user: 95234159,
      },
      {
        name: 'Guh',
        user: 24482087,
      },
      {
        name: 'Matheus',
        user: 21129795,
      },
    ],
  },
  {
    id: 'squad-banking-credit-insurance',
    name: 'Squad Banking & Credit & Insurance',
    members: [
      {
        name: 'Gustavo',
        user: 61552991,
      },
      {
        name: 'Malê',
        user: 56513919,
      },
      {
        name: 'Phelipe',
        user: 22174013,
      },
      {
        name: 'Thiagão',
        user: 65300263,
      },
      {
        name: 'Vini',
        user: 17788722,
      },
    ],
  },
  {
    id: 'squad-platform-ux',
    name: 'Squad Platform & UX',
    members: [
      {
        name: 'João',
        user: 69815066,
      },
      {
        name: 'Lucas',
        user: 7409802,
      },
      {
        name: 'Paulinho',
        user: 17968732,
      },
    ],
  },
] as const

interface IGetSquads {
  (): Array<ISquad>
}

const getSquads: IGetSquads = (): ReturnType<IGetSquads> => SQUADS

export { getSquads, type ISquad }
