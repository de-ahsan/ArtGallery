import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Router from 'next/router'
import axios from 'axios'
import sample from '../assets/images/sample.jpeg'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import styles from '../styles/main.module.css'

const ExhibitionShowPage: NextPage = () => {
  const [exhibition, setExhibition] = useState([])
  const [loading, setLoading] = useState(false)

  interface imageURL {
    image_url: string
  }

  useEffect(async () => {
    setLoading(true)
    let eid = window.location.pathname.split('/')[1]
    const res = await axios.get(`https://api.artic.edu/api/v1/exhibitions/${eid}`)

    setExhibition(res.data.data)
    setLoading(false)
  }, [])

  const showImage = (imageURL: imageURL) => {
    if (imageURL == null || imageURL == undefined) {
      return <Image src={sample} alt='Art Work' width={300} height={250} />
    }

    return <Image src={imageURL} alt='Art Work' width={300} height={250} />
  }

  return (
    <>
      <div className={styles.header}>
        <span className={styles.heading}>
          Exhibitions!
        </span>
      </div>
      <div className={`${styles.pt100} ${styles.pl10}`}>
        <button onClick={() => Router.back()} className={styles.pointer}>Back</button>
        {!loading ? (
          <div>
            <div className={styles.flex}>
              <p>{exhibition.title}</p>
              <span className={styles.duration}>
                <Moment format='DD-MM-YYYY' className={`${styles.pr5} ${styles.italic}`}>{exhibition.aic_start_at}</Moment>
                  -
                <Moment format='DD-MM-YYYY' className={`${styles.pl5} ${styles.italic}`}>{exhibition.aic_end_at}</Moment>
              </span>
            </div>
            <div className={styles.flex}>
              <div className={styles.image}>
                {showImage()}
              </div>
              <div>
                <p className={styles.description}> {exhibition.description} </p>
              </div>
            </div>
          </div>
          ) : (
          <Skeleton height={800} />
        )}
      </div>
    </>
  )
}

export default ExhibitionShowPage
