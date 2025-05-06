// 📁 server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import { nanoid } from "nanoid";

const app = express();
const PORT = 3001;
const DATA_PATH = "./data/projects.json";

// Middleware
app.use(cors());
app.use(express.json());

// Utility to load and save projects
const loadProjects = () => {
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH);
  return JSON.parse(raw);
};

const saveProjects = (projects) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2));
};

// Routes
app.get("/projects", (req, res) => {
  const projects = loadProjects();
  res.json(projects);
});

app.post("/projects", (req, res) => {
  const newProject = { id: nanoid(), ...req.body };
  const projects = loadProjects();
  projects.push(newProject);
  saveProjects(projects);
  res.status(201).json(newProject);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
