import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>PhillyInsights</title>
        <meta name="description" content="Philly Insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <h1 className="text-4xl font-bold">Philly Insights</h1>
        <p className="text-xl">A data-driven look at Philadelphia</p>
      </main>
    </>
  )
}
