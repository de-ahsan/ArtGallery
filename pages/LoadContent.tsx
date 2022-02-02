import { useState } from 'react'
import Image from 'next/image'
import sample from '../assets/images/sample.jpeg'

const Content = ({ data }) => {
  const showImage = imageURL => {
    if (imageURL == null || imageURL == undefined) {
      return <Image src={sample} alt='Art Work' width={300} height={250} />
    }

    return <Image src={imageURL} alt='Art Work' width={300} height={250} />
  }

  return (
    <>
      {data.data.map(item => (
        <div key={item.id} style={{ padding: 5, width: 300, marginBottom: 10 }}>
          {showImage(item.image_url)}
          <p style={{ minHeight: 50, marginBottom: 0 }}> {item.title} </p>
          <span>
            {item.aic_start_at} - {item.aic_end_at}
          </span>
        </div>
      ))}
    </>
  )
}

export default Content
