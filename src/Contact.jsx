export default function Contact() {
    return (
      <section className="contact-container">
        <h2 className="contact-title">📩 Neem contact op</h2>
        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="naam">Naam</label>
              <input type="text" id="naam" name="naam" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mailadres</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>
  
          <div className="form-group full-width">
            <label htmlFor="bericht">Bericht</label>
            <textarea id="bericht" name="bericht" rows="5" required></textarea>
          </div>
  
          <div className="button-row">
            <button type="submit" className="contact-button">✉️ Verzenden</button>
          </div>
        </form>
      </section>
    );
  }
  