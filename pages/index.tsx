import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbars/Navbar'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>REDUX!</p>
    </div>
  )
}
