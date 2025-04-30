const persoonlijkeProjecten = [
    {
        naam: "...",
        beschrijving: "..",
        organisatie: ".",
        github: ".",
        demo: ".",
        technologieen: ["React", "Node.js", "MongoDB"],
        afbeelding: ".",
      },
   
  ];
  
  const groepsProjecten = [
    {
        naam: "Quiz App",
        beschrijving: "Een interactieve quiz gebouwd met JavaScript.",
        github: "https://github.com/mahtabmardani88/...",
        demo: "https://voorbeeld.com/quiz",
        technologieen: ["JavaScript", "HTML", "CSS"],
        afbeelding: "https://via.placeholder.com/300x180?text=Quiz+App",
      },
    {
        naam: "Quiz App",
        beschrijving: "Een interactieve quiz gebouwd met JavaScript.",
        github: "https://github.com/mahtabmardani88/...",
        demo: "https://voorbeeld.com/quiz",
        technologieen: ["JavaScript", "HTML", "CSS"],
        afbeelding: "https://via.placeholder.com/300x180?text=Quiz+App",
      },
  ];


  function ProjectKaart({ project }) {
    return (
      <div className="project-kaart">
        <img src={project.afbeelding} alt={project.naam} />
        <h3>{project.naam}</h3>
        <p>{project.beschrijving}</p>
        {project.organisatie && <p><strong>Organisatie:</strong> {project.organisatie}</p>}
        <p><strong>Talen:</strong> {project.technologieen.join(", ")}</p>
        <a href={project.github} target="_blank">GitHub</a> |{" "}
        <a href={project.demo} target="_blank">Live Demo</a>
      </div>
    );
  }
  
  export default function Projecten() {
    return (
      <section className="projecten-container">
        <h2>📌 Persoonlijke Projecten</h2>
        <div className="projecten-lijst">
          {persoonlijkeProjecten.map((p, i) => <ProjectKaart key={i} project={p} />)}
        </div>
  
        <h2 style={{ marginTop: '3rem' }}>👥 Groepsprojecten</h2>
        <div className="projecten-lijst">
          {groepsProjecten.map((p, i) => <ProjectKaart key={i} project={p} />)}
        </div>
      </section>
    );
  }