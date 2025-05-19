// 📁 src/Projecten.jsx
import { useState } from "react";
import { resolveImagePath } from "./components/ProjectImages";
import ProjectForm from "./components/ProjectForm";

function ProjectKaart({ project }) {
  const [toonAlles, setToonAlles] = useState(false);

  const maxToon = 2;
  const afbeeldingen = Array.isArray(project.afbeelding)
    ? (toonAlles ? project.afbeelding : project.afbeelding.slice(0, maxToon))
    : [project.afbeelding];

  const resolvedImages = afbeeldingen.map(file =>
    typeof file === "string" ? resolveImagePath(file.split("/").pop()) : file
  );

  return (
    <div className="project-kaart">
      <div className="project-images">
        {resolvedImages.map((img, i) => (
          <img key={i} src={img} alt={`${project.naam} ${i + 1}`} />
        ))}

        {Array.isArray(project.afbeelding) && project.afbeelding.length > maxToon && (
          <button
            onClick={() => setToonAlles(!toonAlles)}
            className="toon-meer-btn"
          >
            {toonAlles ? "Minder tonen ▲" : "Meer tonen ▼"}
          </button>
        )}
      </div>
      <div>
        <h3>{project.naam}</h3>
        <p>{project.beschrijving}</p>
        {project.organisatie && <p><strong>Organisatie:</strong> {project.organisatie}</p>}
        <p><strong>Talen:</strong> {project.technologieen.join(", ")}</p>
        <div className="project-links">
          {project.github
            ? <a href={project.github} target="_blank">GitHub</a>
            : <span style={{ fontStyle: "italic", color: "#9ca3af" }}>
                Privé GitHub-repository (niet openbaar)
              </span>}
          {" "}
          <a href={project.demo} target="_blank">Live Demo</a>
        </div>
      </div>
    </div>
  );
}

export default function Projecten({ projecten = [], onAddProject }) {
  const [toonFormulier, setToonFormulier] = useState(false);
 const persoonlijke = projecten.filter(p => p.type === "persoonlijk");
const groeps = projecten.filter(p => p.type === "groeps");

  return (
    <section className="projecten-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => setToonFormulier(!toonFormulier)}
          className="toon-formulier-knop"
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          {toonFormulier ? "✖ Sluit formulier" : "➕ Voeg een nieuw project toe"}
        </button>
      </div>

      {toonFormulier && (
        <div className="project-form-wrapper" style={{ marginBottom: '2rem' }}>
          <ProjectForm onAdd={onAddProject} />
        </div>
      )}

      <h2 style={{ marginTop: '2rem' }}>👥 Groepsprojecten</h2>
      <div className="projecten-lijst">
        {groeps.map((p, i) => <ProjectKaart key={i} project={p} />)}
      </div>

      <h2 style={{ marginTop: '3rem' }}>📌 Persoonlijke Projecten</h2>
      <div className="projecten-lijst">
        {persoonlijke.map((p, i) => <ProjectKaart key={i} project={p} />)}
      </div>
    </section>
  );
}
