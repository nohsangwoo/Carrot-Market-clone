import { readdirSync } from 'fs'
import { NextPage } from 'next'

const Post: NextPage = () => {
  return <h1>hi</h1>
}

export function getStaticPaths() {
  const files = readdirSync('./posts').map(file => {
    const [name, extension] = file.split('.')
    return { params: { slug: name } }
  })
  console.log('files in getStaticPaths: ', files)
  return {
    paths: files,
    fallback: false,
  }
}

export function getStaticProps() {
  return {
    props: {},
  }
}

export default Post
