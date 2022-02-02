import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import Image from 'next/image'
import Moment from 'react-moment'
import sample from '../assets/images/sample.jpeg'
import Router from 'next/router'
import styles from '../styles/main.module.css'

const LoadExhibitions = ({ data }) => {
  const [exhibitions, setExhibitions] = useState(data.data)
  const [hasMore, setHasMore] = useState(true)
  const [nextPageURL, setNextPageURL] = useState(data.pagination.next_url)

  const getMoreExhibitions = async () => {
    const res = await axios.get(nextPageURL)

    setExhibitions([...exhibitions, ...res.data.data])
    setNextPageURL(res.data.pagination.next_url)
  }

  const showExhibitionDetails = id => {
    Router.push(`/${id}`)
  }

  const showImage = (imageURL, id) => {
    let url = ([null, undefined]).includes(imageURL) ? sample : imageURL

    return <Image src={url} alt='Art Work' width={300} height={250} onClick={() => showExhibitionDetails(id)} />
  }

  interface fetchExhibition {
    id: String,
    image_url: String,
    aic_start_at: String,
    aic_end_at: String,
  }

  return (
    <>
      <div className={styles.header}>
        <span className={styles.heading}>
          Exhibitions!
        </span>
      </div>
      <InfiniteScroll
        dataLength={exhibitions.length}
        next={getMoreExhibitions}
        hasMore={hasMore}
        loader={<h3 className={styles.loader}> Loading more exhibitions...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
        className={`${styles.flex} ${styles.scroller}`}

      >
        {exhibitions.map((item: fetchExhibition) => (
          <div key={item.id} className={styles.item}>
            {showImage(item.image_url, item.id)}
            <p className={styles.title}> {item.title} </p>
            <span>
              <Moment format='DD-MM-YYYY' className={`${styles.pr5} ${styles.italic}`}>{item.aic_start_at}</Moment>
                -
              <Moment format='DD-MM-YYYY' className={`${styles.pl5} ${styles.italic}`}>{item.aic_end_at}</Moment>
            </span>
          </div>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default LoadExhibitions
