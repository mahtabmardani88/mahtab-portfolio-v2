// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import pkg from "pg";
import process from 'process';

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(express.json());

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      naam TEXT,
      beschrijving TEXT,
      organisatie TEXT,
      github TEXT,
      demo TEXT,
      technologieen TEXT[],
      afbeelding TEXT[],
      type TEXT
    )
  `);
};

// GET همه پروژه‌ها
app.get("/projects", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects");

  const complete = result.rows.map(p => ({
    ...p,
    type: p.type || "persoonlijk"  // اگر type وجود نداشت، پیش‌فرض بده
  }));

  res.json(complete);
});

// POST پروژه جدید
app.post("/projects", async (req, res) => {
  const newProject = {
    id: nanoid(),
    ...req.body,
    type: req.body.type || "persoonlijk"
  };

  const { id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type } = newProject;

  await pool.query(
    `INSERT INTO projects (id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type]
  );

  res.status(201).json(newProject);
});

// PUT پروژه
app.put("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type } = req.body;

  await pool.query(
    `UPDATE projects SET
      naam = $1,
      beschrijving = $2,
      organisatie = $3,
      github = $4,
      demo = $5,
      technologieen = $6,
      afbeelding = $7,
      type = $8
     WHERE id = $9`,
    [naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type, id]
  );

  res.json({ id, message: "Project updated" });
});


// DELETE پروژه
app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  res.status(204).send();
});

// شروع سرور
app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
