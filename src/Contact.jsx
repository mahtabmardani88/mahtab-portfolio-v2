export default function Contact() {
  return (
    <section className="contact-container">
      <h2 className="contact-title">📩 Neem contact op</h2>
      <form
        action="https://formspree.io/f/mzzrwjqb"
        method="POST"
        className="contact-form"
      >
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
          <textarea id="bericht" name="message" rows="5" required></textarea>
        </div>
        <input type="hidden" name="_subject" value="Nieuw bericht van je portfolio!" />

        <div className="button-row">
          <button type="submit" className="contact-button">
            ✉️ Verzenden
          </button>
        </div>
      </form>
    </section>
  );
}
