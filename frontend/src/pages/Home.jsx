import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <header className="hero">
        <div>
          <h1>Emergency Contacts</h1>
          <p>Providing quick access to emergency contacts through QR codes and NFC technology</p>
          <div className="hero-buttons">
            <Link to="/scanner" className="btn btn-secondary">Change Details</Link>
            <Link to="/create" className="btn btn-primary">Create QR</Link>
            <a
              href="https://www.nhs.uk/conditions/first-aid/after-an-accident/"
              className="btn btn-secondary"
              target="_blank"
              rel="noreferrer"
            >
              First Aid ABC
            </a>
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">QR Code Generation</h2>
          <div className="grid-3">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Enter Information</h3>
              <p>Input your emergency contacts and important details.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Generate Code</h3>
              <p>Create your unique QR code instantly.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Download &amp; Print</h3>
              <p>Get your QR code ready for use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section" style={{ backgroundColor: '#f9fafb' }}>
        <div className="container">
          <h2 className="section-title">Key Features</h2>
          <div className="grid-2">
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="white" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="feature-body">
                <h3>Instant Access</h3>
                <p>Quick access to emergency contacts during critical situations.</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="white" viewBox="0 0 24 24" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="feature-body">
                <h3>Secure Storage</h3>
                <p>Your information is encrypted and stored securely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Scan-To<span style={{ color: '#fde047' }}>-SAVE</span>
              </h3>
              <p>Making emergency contact information accessible when it matters most.</p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Contact Us</h4>
              <p>Email: Prashant24816gp@gmail.com</p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e40af', paddingTop: '1.5rem', textAlign: 'center' }}>
            <p>&copy; 2025 Team CodeX.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
