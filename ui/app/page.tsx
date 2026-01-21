import { NextPage } from 'next'
import Header from './components/header'
import Hero from './components/hero'
import Projects from './components/projects'
import Experience from './components/Experience'
interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div>

     <Header />
     <Hero />
     <Projects />
     <Experience />
   <div>hello world</div>
  </div>
}

export default Page