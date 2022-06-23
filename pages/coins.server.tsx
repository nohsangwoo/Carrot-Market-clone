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

type TickerListType = {
  id: string
  name: string
  symbol: string
  rank: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  beta_value: number
  first_data_at: string
  last_updated: string
  quotes: {
    USD: {
      price: number
      volume_24h: number
      volume_24h_change_24h: number
      market_cap: number
      market_cap_change_24h: number
      percent_change_15m: number
      percent_change_30m: number
      percent_change_1h: number
      percent_change_6h: number
      percent_change_12h: number
      percent_change_24h: number
      percent_change_7d: number
      percent_change_30d: number
      percent_change_1y: number
      ath_price: number
      ath_date: string
      percent_from_price_ath: number
    }
  }
}

const cache: any = {}
function fetchData<T>(url: string): T {
  if (!cache[url]) {
    throw Promise.all([
      fetch(url)
        .then(r => r.json())
        .then(json => (cache[url] = json)),
      new Promise(resolve =>
        setTimeout(resolve, Math.round(Math.random() * 3000)),
      ),
    ])
  }
  return cache[url]
}

function Coin({ id, name, symbol }: CoinsType) {
  const {
    quotes: {
      USD: { price },
    },
  } = fetchData<TickerListType>(`https://api.coinpaprika.com/v1/tickers/${id}`)
  console.log('coin price: ', price)
  return <span>{`${name} / ${symbol}: ${price}`}</span>
}

function List() {
  const coins = fetchData<CoinsType[]>('https://api.coinpaprika.com/v1/coins')

  // console.log('I am rendered on server only')
  // console.log('fetching data: ', coins)
  return (
    <div>
      <h4>List is done</h4>
      <ul>
        {coins.slice(0, 10).map(coin => (
          <li key={coin.id}>
            <Suspense fallback={`coin ${coin.name} is loading...`}>
              <Coin {...coin} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
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
