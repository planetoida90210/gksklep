import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header, HomePage } from '../components'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Galeria Koloru</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <HomePage />
      </main>
    </div>
  )
}

export default Home
