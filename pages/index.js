import Head from 'next/head'
import Search from '../components/Search'
import Lyrics from '../components/Lyrics'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from "next/head"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>lyrist</title>
        <meta name="description" content="lyrics api that just works." />
        <script async defer data-website-id="29e9b38d-3fb5-4cf6-a120-1731741019e1" src="https://umami.asheeshh.ga/umami.js"></script>
        <link rel="icon" href="https://favmoji.asheeshh.ga/🎧" />
      </Head>
      <Header />
      <Lyrics />
      <Footer />
    </div>
  )
}
