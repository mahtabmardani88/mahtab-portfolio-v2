import { useEffect, useState } from "react";
import Header from "./header";
import './index.css';
import Projecten from './Projecten';
import Contact from './Contact';
import Footer from './footer';
import AboutMe from './AboutMe';


function App() {
  const [projects, setProjects] = useState([]);


 useEffect(() => {
    fetch("https://mahtab-portfolio-v2.onrender.com/projects")
      .then(res => res.json())
      .then(data => {
        console.log("✅ Projects fetched:", data);
        setProjects(data);
      });
  }, []);


 const handleAddProject = (newProj) => {
    setProjects(prev => [...prev, newProj]);
  };


  return (
    <>
    <Header />
      <div className="container">
        <AboutMe />
        <Projecten projecten={projects} onAddProject={handleAddProject} />
        <Contact />
      </div>
      <Footer />
    </>
  );
}
export default App;