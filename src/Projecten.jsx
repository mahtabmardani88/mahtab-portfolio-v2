// 📁 src/Projecten.jsx
import { useState } from "react";
import { resolveImagePath } from "./components/ProjectImages";
import ProjectForm from "./components/ProjectForm";
import Modal from "./components/Modal";

function ProjectKaart({ project }) {
  const [toonAlles, setToonAlles] = useState(false);

  const maxToon = 2;
  const afbeeldingen = Array.isArray(project.afbeelding)
    ? (toonAlles ? project.afbeelding : project.afbeelding.slice(0, maxToon))
    : (project.afbeelding ? [project.afbeelding] : []);

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
        <p><strong>Talen:</strong> {(project.technologieen || []).join(", ")}</p>
        <div className="project-links">
          {project.github
            ? <a href={project.github} target="_blank">GitHub</a>
            : <span style={{ fontStyle: "italic", color: "#9ca3af" }}>
                Privé GitHub-repository (niet openbaar)
              </span>}
          {" "}
          {project.demo
            ? <a href={project.demo} target="_blank">Live Demo</a>
            : <span style={{ fontStyle: "italic", color: "#9ca3af" }}>
                Geen live demo beschikbaar
              </span>}
        </div>
      </div>
    </div>
  );
}

export default function Projecten({ projecten = [] , onAddProject}) {
  const [toonFormulier, setToonFormulier] = useState(false);

const geldige = projecten.filter(p => p.naam && p.beschrijving);
const persoonlijke = geldige.filter(p => p.type === "persoonlijk");
const groeps = geldige.filter(p => p.type === "groeps");


   console.log("✅ ontvangen projecten:", projecten);
  console.log("📌 persoonlijke:", persoonlijke);
  console.log("👥 groeps:", groeps);

  
  return (

    <section className="projecten-container">
      <h2>👥 Groepsprojecten</h2>
      <div className="projecten-lijst">
        {groeps.length > 0
          ? groeps.map((p, i) => <ProjectKaart key={i} project={p} />)
          : <p style={{ color: "#888" }}>Geen groepsprojecten gevonden.</p>}
      </div>

      <h2>📌 Persoonlijke Projecten</h2>
      <div className="projecten-lijst">
        {persoonlijke.length > 0
          ? persoonlijke.map((p, i) => <ProjectKaart key={i} project={p} />)
          : <p style={{ color: "#888" }}>Geen persoonlijke projecten gevonden.</p>}
      </div>
       {/* 🟢 دکمه + برای نمایش فرم */}
      <div
        onClick={() => setToonFormulier(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#2563eb",
          color: "white",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "2rem",
          textAlign: "center",
          lineHeight: "50px",
          cursor: "pointer",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
        }}
        title="Nieuw project toevoegen"
      >
        +
      </div>

      {/* 🟠 فرم در پاپ‌آپ */}
      <Modal isOpen={toonFormulier} onClose={() => setToonFormulier(false)}>
        <ProjectForm
          onAdd={(newProj) => {
            onAddProject(newProj);
            setToonFormulier(false);
          }}
        />
      </Modal>
    </section>
//     <section className="projecten-container">
//      <h2>👥 Groepsprojecten</h2>
// <div className="projecten-lijst">
//   {groeps.length > 0
//     ? groeps.map((p, i) => <ProjectKaart key={i} project={p} />)
//     : <p style={{ color: "#999" }}>Geen groepsprojecten gevonden.</p>}
// </div>

//       <h2>📌 Persoonlijke Projecten</h2>
// <div className="projecten-lijst">
//   {persoonlijke.length > 0
//     ? persoonlijke.map((p, i) => <ProjectKaart key={i} project={p} />)
//     : <p style={{ color: "#999" }}>Geen persoonlijke projecten gevonden.</p>}
// </div>

//       {/* ➕ دکمه افزودن پروژه */}
//       <div
//         onClick={() => setToonFormulier(true)}
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           right: "20px",
//           backgroundColor: "#2563eb",
//           color: "white",
//           borderRadius: "50%",
//           width: "50px",
//           height: "50px",
//           fontSize: "2rem",
//           textAlign: "center",
//           lineHeight: "50px",
//           cursor: "pointer",
//           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)"
//         }}
//         title="Nieuw project toevoegen"
//       >
//         +
//       </div>

//       {/* فرم در مودال */}
//       <Modal isOpen={toonFormulier} onClose={() => setToonFormulier(false)}>
//         <ProjectForm
//           onAdd={(newProj) => {
//             onAddProject(newProj);
//             setToonFormulier(false);
//           }}
//         />
//       </Modal>
//     </section>
  );
}