import { NextPage } from "next";
import Header from "./components/header";
import Hero from "./components/hero";
import Projects from "./components/projects";
import Experience from "./components/Experience";
import Awards from "./components/awards";
import Contact from "./components/contact";
import Footer from "./components/footer";
interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="experience">
        <Experience />
      </div>
      {/* <Awards /> */}
      <div id="api-lab">
        <Contact />
      </div>
      <Footer />

 
    </div>
  );
};

export default Page;
