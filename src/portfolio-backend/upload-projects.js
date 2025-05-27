// upload-projects.js
import fetch from "node-fetch";
import { readFile } from "fs/promises";


const rawData = await readFile("./data/projects.json", "utf-8");
const projects = JSON.parse(rawData);

const API_URL = "https://mahtab-portfolio-v2.onrender.com/projects";

const upload = async () => {
  for (const project of projects) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });

      if (res.ok) {
        console.log(`✅ ${project.naam} toegevoegd`);
      } else {
        console.error(`❌ Fout bij ${project.naam}:`, await res.text());
      }
    } catch (err) {
      console.error(`❌ Netwerkfout bij ${project.naam}:`, err.message);
    }
  }
};

upload();
