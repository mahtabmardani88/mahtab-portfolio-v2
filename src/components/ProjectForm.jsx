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
  <label>
    Wat is de naam van het project?
    <input name="naam" value={formData.naam} onChange={handleChange} required />
  </label>

  <label>
    Beschrijving van het project
    <input name="beschrijving" value={formData.beschrijving} onChange={handleChange} required />
  </label>

  <label>
    Organisatie (optioneel)
    <input name="organisatie" value={formData.organisatie} onChange={handleChange} />
  </label>

  <label>
    GitHub link
    <input name="github" value={formData.github} onChange={handleChange} />
  </label>

  <label>
    Live demo link
    <input name="demo" value={formData.demo} onChange={handleChange} />
  </label>

  <label>
    Technologieën (gescheiden door komma's)
    <input name="technologieen" value={formData.technologieen} onChange={handleChange} />
  </label>

  <label>
    Type project
    <select name="type" value={formData.type} onChange={handleChange} required>
      <option value="">Selecteer type</option>
      <option value="persoonlijk">Persoonlijk project</option>
      <option value="groeps">Groepsproject</option>
    </select>
  </label>

  <label>
    Afbeelding URL of bestandsnaam
    <input name="afbeelding" value={formData.afbeelding} onChange={handleChange} />
  </label>

  <button type="submit">Project toevoegen</button>
</form>

  );
}
