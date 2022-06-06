import Link from 'next/link'
import Layout from '../components/Layout'
import { Button } from '@chakra-ui/react'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      {/* <Button>aaa</Button> */}
    </p>
  </Layout>
)

export default IndexPage
