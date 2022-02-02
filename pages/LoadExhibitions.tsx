import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import Image from 'next/image'
import Moment from 'react-moment'
import sample from '../assets/images/sample.jpeg'
import Router from 'next/router'

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
      <div style={{ background: '#676767', position: 'absolute', top: 0, width: '100%', height: 90 }}>
        <span style={{ color: 'white', paddingLeft: 15, paddingTop: 20, position: 'absolute', fontSize: 35, fontWeight: 'normal' }}>
          Exhibitions!
        </span>
      </div>
      <InfiniteScroll
        dataLength={exhibitions.length}
        next={getMoreExhibitions}
        hasMore={hasMore}
        loader={<h3 style={{ display: 'block', width: '100%', textAlign: 'center', fontSize: 30, fontWeight: 300, fontStyle: 'italic' }}> Loading more exhibitions...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
        className={{ display: 'flex' }}
        style={{ paddingTop: 100, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}
      >
        {exhibitions.map((item: fetchExhibition) => (
          <div key={item.id} style={{ padding: 5, width: 300, marginBottom: 10 }}>
            {showImage(item.image_url, item.id)}
            <p style={{ minHeight: 50, marginBottom: 0 }}> {item.title} </p>
            <span>
              <Moment format='DD-MM-YYYY' style={{ paddingRight: 5, fontStyle: 'italic' }}>{item.aic_start_at}</Moment>
                -
              <Moment format='DD-MM-YYYY' style={{ paddingLeft: 5, fontStyle: 'italic' }}>{item.aic_end_at}</Moment>
            </span>
          </div>
        ))}
      </InfiniteScroll>
    </>
  )
}

export default LoadExhibitions
