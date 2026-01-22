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
      <Hero />
      <Projects />
      <Experience />
      {/* <Awards /> */}
      <Contact />
      <Footer />

 
    </div>
  );
};

export default Page;
