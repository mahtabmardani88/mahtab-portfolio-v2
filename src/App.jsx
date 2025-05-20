import Header from "../src/header";
import './index.css';
import Projecten from './Projecten';
import Contact from './Contact';
import Footer from './footer';
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
    <Header />
      <div className="container">
        <AboutMe />
        <Projecten projecten={data} onAddProject={handleAddProject} />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;