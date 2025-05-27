import { useState } from "react";

export default function ProjectForm({ onAdd }) {
  const [formData, setFormData] = useState({
    naam: "",
    beschrijving: "",
    organisatie: "",
    github: "",
    demo: "",
    technologieen: "",
    afbeelding: null,
    type: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "afbeelding") {
      setFormData((prev) => ({ ...prev, afbeelding: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Submitting...");


    const formDataToSend = new FormData();
    formDataToSend.append("naam", formData.naam);
    formDataToSend.append("beschrijving", formData.beschrijving);
    formDataToSend.append("organisatie", formData.organisatie);
    formDataToSend.append("github", formData.github);
    formDataToSend.append("demo", formData.demo);
    formDataToSend.append("type", formData.type);
   formDataToSend.append("technologieen", JSON.stringify(
  formData.technologieen.split(",").map(t => t.trim())
));

    if (formData.afbeelding) {
      formDataToSend.append("afbeelding", formData.afbeelding);
    }

    const res = await fetch("https://mahtab-portfolio-v2.onrender.com/projects", {
      method: "POST",
      body: formDataToSend,
    });

 const result = await res.json();

if (result && result.naam) {
  onAdd(result);
}

    setFormData({
      naam: "",
      beschrijving: "",
      organisatie: "",
      github: "",
      demo: "",
      technologieen: "",
      afbeelding: null,
      type: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <label>
        Wat is de naam van het project?
        <input name="naam" value={formData.naam} onChange={handleChange} required />
      </label>

      <label>
        Beschrijving van het project
        <input name="beschrijving" value={formData.beschrijving} onChange={handleChange} />
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
        Afbeelding uploaden
        <input name="afbeelding" type="file" accept="image/*" onChange={handleChange} />
      </label>

      <button type="submit">Project toevoegen</button>
    </form>
  );
}
