
import './index.css';
import Projecten from './Projecten';
import Contact from './Contact';
import Footer from './footer';
import logo from './assets/mahtab logo.png';
import AboutMe from './AboutMe';
import ProjectForm from "./components/ProjectForm";
import { useEffect, useState } from "react";
import data from "./portfolio-backend/data/projects.json";



function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://mahtab-portfolio-v2.onrender.com/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const handleAddProject = (newProj) => {
    setProjects([...projects, newProj]);
  };

  return (
    <>
      <div className="container">
        <img src={logo} alt="Mahtab Mardani logo" className="logo" />
        <AboutMe />

        <a href="https://github.com/mahtabmardani88" target="_blank">Bekijk mijn GitHub</a>
        




        <Projecten projecten={data} onAddProject={handleAddProject} />

        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default App;