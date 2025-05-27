import fetch from "node-fetch";

const API_URL = "https://mahtab-portfolio-v2.onrender.com/projects";

const fix = async () => {
  const res = await fetch(API_URL);
  const all = await res.json();

  const zonderType = all.filter(p => !p.type);
  console.log(`🔧 ${zonderType.length} projecten zonder "type" gevonden.`);

  for (const p of zonderType) {
    try {
      const resp = await fetch(`${API_URL}/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, type: "persoonlijk" })
      });

      if (!resp.ok) {
        const text = await resp.text();
        console.log(`❌ Fout bij ${p.naam}: ${text}`);
      } else {
        console.log(`✅ ${p.naam} bijgewerkt`);
      }
    } catch (err) {
      console.log(`❌ Netwerkfout bij ${p.naam}: ${err.message}`);
    }
  }
};

fix();
