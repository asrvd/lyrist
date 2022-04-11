import Head from 'next/head'
import Search from '../components/Search'
import Lyrics from '../components/Lyrics'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Lyrics />
      <Footer />
    </div>
  )
}
