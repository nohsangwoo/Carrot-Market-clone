import Layout from '@components/layout'
import { readdirSync } from 'fs'
import matter from 'gray-matter'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

const Post: NextPage<{
  post: string
  data: { title: string; date: string; category: string }
}> = ({ post, data }) => {
  return (
    <Layout title={data.title}>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  // const files = readdirSync('./posts').map(file => {
  //   const [name, extension] = file.split('.')
  //   return { params: { slug: name } }
  // })
  return {
    // paths: files,
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ctx => {
  const { content, data } = matter.read(`posts/${ctx.params?.slug}.md`)
  console.log(content)
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content)

  return {
    props: { data, post: value },
  }
}

export default Post
