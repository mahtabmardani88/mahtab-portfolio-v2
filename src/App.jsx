import { useEffect, useState } from "react";
import Header from "./Header";
import "./index.css";
import Projecten from "./Projecten";
import Contact from "./Contact";
import Footer from "./Footer";
import AboutMe from "./AboutMe";

// 📌 Supabase client
import { supabase } from "./portfolio-backend/supabaseClient";

function App() {
  const [projects, setProjects] = useState([]);

  // ✅ Fetch projects from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      let { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("❌ Error fetching projects:", error);
      } else {
        console.log("✅ ontvangen projecten:", data);
        setProjects(data);
      }
    };
    fetchProjects();
  }, []);

  // ✅ Add project (insert into Supabase)
  const handleAddProject = async (newProj) => {
    const { data, error } = await supabase
      .from("projects")
      .insert([newProj])
      .select();

    if (error) {
      console.error("❌ Error adding project:", error);
    } else {
      setProjects((prev) => [...prev, ...data]);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <AboutMe />
        <Projecten projecten={projects} onAddProject={handleAddProject} />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
