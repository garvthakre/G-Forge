import { NextPage } from 'next'
import Header from './components/header'
import Hero from './components/hero'
import Projects from './components/projects'
interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div>

     <Header />
     <Hero />
     <Projects />
   <div>hello world</div>
  </div>
}

export default Page