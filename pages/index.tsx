import type { NextPage } from 'next'
import FloatingButton from '@components/floating-button'
import Item from '@components/item'
import Layout from '@components/layout'
import useUser from '@libs/client/useUser'
import Head from 'next/head'
import useSWR from 'swr'
import { Product } from '@prisma/client'
import client from '@libs/server/client'
export interface ProductWithCount extends Product {
  _count: {
    favs: number
  }
}
interface ProductResponse {
  ok: boolean
  products: ProductWithCount[]
}

const Home: NextPage<{ products: ProductWithCount[] }> = ({
  products,
}): JSX.Element => {
  console.log('index props: ', products)
  const { user, isLoading } = useUser()
  // const { data } = useSWR<ProductResponse>('/api/products')
  console.log('user: ', user)

  return (
    <Layout title="홈" hasTabBar seoTitle="Home">
      <div className="flex flex-col space-y-5 divide-y">
        {products?.map(product => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count?.favs}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  console.log('SSR')
  // const res = await fetch('/api/products')
  // const data = await res.json()
  const products = await client.product.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
  })
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}

export default Home
