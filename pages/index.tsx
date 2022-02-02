import type { NextPage } from 'next'
import axios from 'axios'
import LoadContent from './LoadContent'

const Exhibitions: NextPage = ({ result }) => {
  return (
    <div>
      <LoadContent data={result} />
    </div>
  )
}

export default Exhibitions

export async function getStaticProps() {
  const res = await axios.get('https://api.artic.edu/api/v1/exhibitions?limit=10')

  return {
    props: {
      result: res.data
    }
  }
}
