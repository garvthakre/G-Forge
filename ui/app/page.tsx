import { NextPage } from 'next'
import Header from './components/header'
import Hero from './components/hero'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div>

     <Header />
     <Hero />
   <div>hello world</div>
  </div>
}

export default Page