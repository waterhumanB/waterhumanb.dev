import Layout from "../components/Layout"
import HomeProfile from "../components/domain/HomeProfile"
import { defaultMetaData } from "../data/metaData"

export default function Home() {
  return (
    <Layout metaData={defaultMetaData}>
      <HomeProfile />
    </Layout>
  )
}
