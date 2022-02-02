import type { NextPage } from 'next'
import axios from 'axios'
import LoadExhibitions from './LoadExhibitions'

const Exhibitions: NextPage = ({ result }) => (
  <div>
    <LoadExhibitions data={result} />
  </div>
)

export default Exhibitions

export const getStaticProps = async () => {
  const res = await axios.get('https://api.artic.edu/api/v1/exhibitions?limit=10')

  return {
    props: {
      result: res.data
    }
  }
}
