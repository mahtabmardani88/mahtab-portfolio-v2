import over1 from "./assets/image/over mij (1).jpg";
import over2 from "./assets/image/over mij (2).jpg";
import over3 from "./assets/image/over mij (3).jpg";
import over4 from "./assets/image/over mij (4).jpg";

import cap1 from "./assets/image/capgemini1.jpg";
import cap2 from "./assets/image/capgemini (2).jpg";
import cap4 from "./assets/image/capgemini (4).jpg";

import hyf1 from "./assets/image/HYF (1).jpg";
import hyf2 from "./assets/image/HYF (2).jpg";




export default function AboutMe() {
  return (
    <section className="aboutme-container">
      <h2>Over mij</h2>

      {/* عکس‌های بالای بخش */}
      <div className="aboutme-photos">
        {[over1, over2, over3, over4].map((src, i) => (
          <img key={i} src={src} alt={`Over mij ${i + 1}`} className="aboutme-photo" />
        ))}
      </div>

      <p>Hallo! Mijn naam is Mahtab en ik ben 36 jaar oud. Ik kom oorspronkelijk uit Iran...</p>

      <p>Ik volgde een opleiding in naaien...</p>

      <p>Door mijn werkervaring heb ik sterke vaardigheden ontwikkeld...</p>

      <p>In 2019 verhuisde ik naar Nederland om een nieuw hoofdstuk in mijn leven te beginnen.</p>

      <p>Hier ontdekte ik mijn oude droom...</p>

      <p>Na een periode van zelfstudie volgde ik een korte C#-cursus aan een hogeschool in Breda. Daarna werd ik geselecteerd voor een zes maanden durende traineeship bij Capgemini als software engineer. Hier maakte ik kennis met Java en werkte ik in teams aan klantprojecten volgens de Scrum-methode...</p>

      {/* عکس‌های Capgemini */}
      <div className="aboutme-photos">
        {[cap1, cap2, cap4].map((src, i) => (
          <img key={i} src={src} alt={`Capgemini ${i + 1}`} className="aboutme-photo" />
        ))}
      </div>

      <p>Later volgde ik de intensieve en onvergetelijke bootcamp van HackYourFuture, waar ik werd opgeleid als full-stack developer...</p>

      {/* عکس HYF */}
      <div className="aboutme-photos">
        <img src={hyf1} alt="HackYourFuture" className="aboutme-photo" />
        <img src={hyf2} alt="HackYourFuture" className="aboutme-photo" />
      </div>

      <p>Sinds ik in Nederland woon, heb ik twee nieuwe talen geleerd en ben ik erg actief gebleven...</p>
    </section>
  );
}