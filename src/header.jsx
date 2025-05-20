// 📁 src/Header.jsx
import logo from "./assets/mahtab logo.png";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <img src={logo} alt="Mahtab Mardani" className="header-logo" />
      </div>
      <div className="header-right">
        <a href="https://github.com/mahtabmardani88" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
       <a href="https://www.linkedin.com/in/mahtab-mardani-5a5699252" target="_blank" rel="noopener noreferrer">
  LinkedIn
</a>

        <a href="mailto:mahtab@example.com">Email</a>
      </div>
    </header>
  );
}
