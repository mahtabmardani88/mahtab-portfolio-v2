import './index.css';
import Projecten from './Projecten';
import Contact from './Contact';
import Footer from './Footer';

function App() {
  return (
    <>
    <div className="container">
      <h1>Hoi! Ik ben Mahtab 👋</h1>
      <p>Ik ben een enthousiaste junior webontwikkelaar met ervaring in Java, React, Node.js en teamprojecten.</p>
      <p>Ik hou van leren, creatief zijn en het bouwen van leuke kleine projecten. Elke paar dagen voeg ik een nieuw project toe!</p>
      <p>Deze website is mijn persoonlijke portfolio waar je al mijn werk kunt bekijken 😊</p>
      <a href="https://github.com/mahtabmardani88" target="_blank">Bekijk mijn GitHub</a>
      <Projecten/>
      <Contact />
    </div>
      <Footer />
      </>
  )
}

export default App
