// 📁 src/components/ProjectForm.jsx
import { useState } from "react";

export default function ProjectForm({ onAdd }) {
  const [formData, setFormData] = useState({
    naam: "",
    beschrijving: "",
    organisatie: "",
    github: "",
    demo: "",
    technologieen: "",
    afbeelding: "" ,
    type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologieen: formData.technologieen.split(",").map(t => t.trim())
    };

    const res = await fetch("https://mahtab-portfolio-v2.onrender.com/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const newProject = await res.json();
    onAdd(newProject);
    setFormData({ naam: "", beschrijving: "", organisatie: "", github: "", demo: "", technologieen: "", afbeelding: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h3>➕ Voeg een nieuw project toe</h3>
      <input name="naam" value={formData.naam} onChange={handleChange} placeholder="Naam" required />
      <input name="beschrijving" value={formData.beschrijving} onChange={handleChange} placeholder="Beschrijving" required />
      <input name="organisatie" value={formData.organisatie} onChange={handleChange} placeholder="Organisatie" />
      <input name="github" value={formData.github} onChange={handleChange} placeholder="GitHub link" />
      <input name="demo" value={formData.demo} onChange={handleChange} placeholder="Live demo link" />
      <input name="technologieen" value={formData.technologieen} onChange={handleChange} placeholder="Talen (gescheiden door komma's)" />
      <select name="type" value={formData.type} onChange={handleChange} required>
  <option value="">Selecteer type</option>
  <option value="persoonlijk">Persoonlijk project</option>
  <option value="groeps">Groepsproject</option>
</select>
      <input name="afbeelding" value={formData.afbeelding} onChange={handleChange} placeholder="Afbeelding URL of bestandsnaam" />
      <button type="submit">Project toevoegen</button>
      
    </form>
  );
}
