import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Router from 'next/router'
import axios from 'axios'
import sample from '../assets/images/sample.jpeg'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'

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
      <div style={{ paddingBottom: 30, background: '#676767', position: 'absolute', top: 0, width: '100%', height: 80 }}>
        <span style={{ color: 'white', paddingLeft: 15, paddingTop: 20, position: 'absolute', fontSize: 35, fontWeight: 'normal' }}>
          Exhibitions!
        </span>
      </div>
      <div style={{ paddingTop: 100, paddingLeft: 10 }}>
        <button onClick={() => Router.back()} style={{ 'cursor': 'pointer' }}>Back</button>
        {!loading ? (
          <div>
            <div style={{ display: 'flex' }}>
              <p>{exhibition.title}</p>
              <span style={{ paddingTop: 25, paddingLeft: 5, fontSize: 12 }}>
                <Moment format='DD-MM-YYYY' style={{ paddingRight: 5, fontStyle: 'italic' }}>{exhibition.aic_start_at}</Moment>
                  -
                <Moment format='DD-MM-YYYY' style={{ paddingLeft: 5, fontStyle: 'italic' }}>{exhibition.aic_end_at}</Moment>
              </span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ minHeight: 300, minWidth: 250 }}>
                {showImage()}
              </div>
              <div>
                <p style={{ marginTop: 0, paddingLeft: 10, fontSize: 15 }}> {exhibition.description} </p>
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
