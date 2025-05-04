import './index.css';
import Projecten from './Projecten';
import Contact from './Contact';
import Footer from './footer';
import logo from './assets/mahtab logo.png';
import AboutMe from './AboutMe';


function App() {
  return (
    <>
    <div className="container">
    <img src={logo} alt="Mahtab Mardani logo" className="logo" />
    <AboutMe />
      <a href="https://github.com/mahtabmardani88" target="_blank">Bekijk mijn GitHub</a>
      <Projecten/>
      <Contact />
    </div>
      <Footer />
      </>
  )
}

export default App
