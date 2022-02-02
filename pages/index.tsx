import type { NextPage } from 'next'
import axios from 'axios'
import LoadExhibitions from './LoadExhibitions'
import { AppURL } from '../constants/path.tsx'

const Exhibitions: NextPage = ({ result }) => (
  <div>
    <LoadExhibitions data={result} />
  </div>
)

export default Exhibitions

export const getStaticProps = async () => {
  const res = await axios.get(`${AppURL}?limit=10`)

  return {
    props: {
      result: res.data
    }
  }
}
