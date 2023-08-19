import React from 'react'
import styles from "@/styles/popularMovies.module.scss"
const PopularMovies = () => {
  return (
    <div className={styles.wrap}>
      <video autoPlay muted controls src="/insidious_trailer.mov"/>
    </div>
  )
}

export default PopularMovies