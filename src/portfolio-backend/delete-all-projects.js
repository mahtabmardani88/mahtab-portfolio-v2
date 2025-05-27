// delete-all-projects.js
import fetch from "node-fetch";

const API_URL = "https://mahtab-portfolio-v2.onrender.com/projects";

const clearAll = async () => {
  const res = await fetch(API_URL);
  const all = await res.json();

  for (const p of all) {
    try {
      const resp = await fetch(`${API_URL}/${p.id}`, { method: "DELETE" });
      if (resp.ok) {
        console.log(`🗑 Verwijderd: ${p.naam || p.id}`);
      } else {
        console.log(`❌ Fout bij verwijderen: ${p.id}`);
      }
    } catch (err) {
      console.log(`❌ Netwerkfout bij ${p.id}: ${err.message}`);
    }
  }
};

clearAll();
