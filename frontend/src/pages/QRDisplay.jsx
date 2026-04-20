import { useParams, useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5000/api';

function QRDisplay() {
  const { id } = useParams();
  const location = useLocation();

  // QR image passed from CreateProfile page via router state
  const qrBase64 = location.state?.qrBase64;

  function handleDownload() {
    window.open(`${API_URL}/profiles/${id}/qr`, '_blank');
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <h1 className="page-title">Your QR Code</h1>

            <div className="qr-container">
              <img src={`${API_URL}/profiles/${id}/qr`} alt="QR Code" />
            </div>

            <button onClick={handleDownload} className="btn btn-primary" style={{ marginBottom: '1rem' }}>
              Download QR Code
            </button>

            <p className="helper-text">
              Print this QR code or save it to your device for quick access to your emergency information.
            </p>

            <div className="additional-actions">
              <h2 className="action-title">What's Next?</h2>
              <div className="action-buttons">
                <Link to={`/profile/${id}`} className="btn btn-secondary">View Profile</Link>
                <Link to={`/edit/${id}`} className="btn btn-secondary">Update Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default QRDisplay;
