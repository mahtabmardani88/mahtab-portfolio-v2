import fetch from "node-fetch";

const API_URL = "https://mahtab-portfolio-v2.onrender.com/projects";

const cleanup = async () => {
  const res = await fetch(API_URL);
  const all = await res.json();

  const kapotte = all.filter(p => !p.naam);
  console.log(`🧹 ${kapotte.length} kapotte projecten gevonden.`);

  for (const p of kapotte) {
    try {
      const resp = await fetch(`${API_URL}/${p.id}`, { method: "DELETE" });
      if (resp.ok) {
        console.log(`🗑 Verwijderd: ${p.id}`);
      } else {
        console.log(`❌ Fout bij verwijderen: ${p.id}`);
      }
    } catch (err) {
      console.log(`❌ Netwerkfout bij ${p.id}: ${err.message}`);
    }
  }
};

cleanup();  // ✅ اسم درست صدا زده شده
