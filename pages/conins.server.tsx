import { Suspense } from 'react'

/* let finished = false
function List() {
  if (!finished) {
    throw Promise.all([
      new Promise(resolve => setTimeout(resolve, 5000)),
      new Promise(resolve => {
        finished = true
        resolve('')
      }),
    ])
  }
  console.log('I am rendered on server only')
  return <ul>xxxxx</ul>
} */

type CoinsType = {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

const cache: any = {}
function fetchData(url: string): CoinsType[] {
  if (!cache[url]) {
    throw fetch(url)
      .then(r => r.json())
      .then(json => (cache[url] = json.slice(0, 50)))
  }
  return cache[url]
}

function List() {
  const coins = fetchData('https://api.coinpaprika.com/v1/coins')

  console.log('I am rendered on server only')
  console.log('fetching data: ', coins)
  return (
    <ul>
      {coins.map(coin => (
        <li key={coin.id}>
          {coin.name} / {coin.symbol}
        </li>
      ))}
    </ul>
  )
}

export default function Coins() {
  return (
    <div>
      <h1>Welcome to RSC</h1>
      <Suspense fallback="Rendering in the server...">
        <List />
      </Suspense>
    </div>
  )
}

export const config = {
  runtime: 'edge',
}
