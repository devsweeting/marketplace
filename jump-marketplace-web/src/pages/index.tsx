import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jump homepage</title>
         <meta name="description" content="Jump web app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <main className={styles.main}>
         <h1 className={styles.title}>
         Jump homepage
        </h1>
      </main>

      <footer className={styles.footer}>
        <p>
          Footer
        </p>
      </footer>
    </div>
  )
}

export default Home
