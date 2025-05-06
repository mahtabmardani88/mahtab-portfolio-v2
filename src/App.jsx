import './index.css';
import Projecten from './Projecten';
import Contact from './Contact';
import Footer from './footer';
import logo from './assets/mahtab logo.png';
import AboutMe from './AboutMe';
import ProjectForm from "./components/ProjectForm";
import { useEffect, useState } from "react";



function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/projects")
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
        




        <Projecten projecten={projects} onAddProject={handleAddProject} />

        <Contact />
      </div>

      <Footer />
    </>
  );
}

export default App;
