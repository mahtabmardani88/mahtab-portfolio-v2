// ✅ نسخه PostgreSQL شده‌ی server.js با استفاده از pg
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3001;

// استفاده از Environment Variables برای اتصال به دیتابیس
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

// CREATE TABLE اگر وجود نداشت
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
      afbeelding TEXT[]
    )
  `);
};

// GET /projects
app.get("/projects", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects");
  res.json(result.rows);
});

// POST /projects
app.post("/projects", async (req, res) => {
  const newProject = {
    id: nanoid(),
    ...req.body
  };
  const { id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding } = newProject;
  await pool.query(
    `INSERT INTO projects (id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding]
  );
  res.status(201).json(newProject);
});

// Start Server
app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
