import { useState } from "react";
import { supabase } from "../portfolio-backend/supabaseClient";

export default function ProjectForm({ onAdd }) {
  const [formData, setFormData] = useState({
    naam: "",
    beschrijving: "",
    organisatie: "",
    github: "",
    demo: "",
    technologieen: "",
    afbeelding: "",
    type: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting to Supabase...");

    // تکنولوژی‌ها رو به آرایه تبدیل می‌کنیم
    const techArray = formData.technologieen
      ? formData.technologieen.split(",").map((t) => t.trim())
      : [];

    // داده برای درج
    const newProject = {
      naam: formData.naam,
      beschrijving: formData.beschrijving,
      organisatie: formData.organisatie,
      github: formData.github,
      demo: formData.demo,
      technologieen: techArray,
      afbeelding: formData.afbeelding ? [formData.afbeelding] : [],
      type: formData.type,
    };

    const { data, error } = await supabase
      .from("projects")
      .insert([newProject])
      .select();

    if (error) {
      console.error("❌ Error inserting project:", error);
    } else {
      console.log("✅ Inserted:", data);
      onAdd(data[0]);
    }

    // فرم ریست
    setFormData({
      naam: "",
      beschrijving: "",
      organisatie: "",
      github: "",
      demo: "",
      technologieen: "",
      afbeelding: "",
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
        Afbeelding (naam bestand bv: countries-api.png)
        <input name="afbeelding" value={formData.afbeelding} onChange={handleChange} />
      </label>

      <button type="submit">Project toevoegen</button>
    </form>
  );
}
