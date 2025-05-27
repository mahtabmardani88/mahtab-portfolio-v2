// server.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import pkg from "pg";
import process from 'process';
import fileUpload from "express-fileupload";
import path from "path";

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Middlewares
app.use(cors());
app.use(express.json()); // for JSON requests
app.use(fileUpload());   // for multipart/form-data (file uploads)
app.use("/uploads", express.static("uploads")); // serve uploaded images

// DB table
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

// GET all projects
app.get("/projects", async (req, res) => {
  const result = await pool.query("SELECT * FROM projects");

  const complete = result.rows.map(p => ({
    ...p,
    type: p.type || "persoonlijk"
  }));

  res.json(complete);
});

// POST new project
app.post("/projects", async (req, res) => {
  try {
    const {
      naam,
      beschrijving,
      organisatie,
      github,
      demo,
      technologieen,
      type
    } = req.body;

    const techArray = technologieen.split(",").map(t => t.trim());
    const afbeeldingen = [];

    // Process uploaded image (optional)
    if (req.files?.afbeelding) {
      const file = req.files.afbeelding;
      const safeFileName = `${Date.now()}-${file.name}`;
      const uploadPath = path.join("uploads", safeFileName);

      await file.mv(uploadPath);
      afbeeldingen.push(`/uploads/${safeFileName}`);
    }

    const id = nanoid();

    await pool.query(`
      INSERT INTO projects (id, naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [id, naam, beschrijving, organisatie, github, demo, techArray, afbeeldingen, type]);

    res.status(201).json({
      id,
      naam,
      beschrijving,
      organisatie,
      github,
      demo,
      technologieen: techArray,
      afbeelding: afbeeldingen,
      type
    });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).send("Serverfout");
  }
});

// PUT update project
app.put("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const {
    naam, beschrijving, organisatie, github,
    demo, technologieen, afbeelding, type
  } = req.body;

  await pool.query(`
    UPDATE projects SET
      naam = $1,
      beschrijving = $2,
      organisatie = $3,
      github = $4,
      demo = $5,
      technologieen = $6,
      afbeelding = $7,
      type = $8
    WHERE id = $9
  `, [naam, beschrijving, organisatie, github, demo, technologieen, afbeelding, type, id]);

  res.json({ message: "Project updated", id });
});

// DELETE project
app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM projects WHERE id = $1", [id]);
  res.status(204).send();
});

// Start
app.listen(PORT, async () => {
  await initDb();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
