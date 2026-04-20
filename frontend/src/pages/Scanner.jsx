import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsQR from 'jsqr';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5000/api';

function Scanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [status, setStatus] = useState('Starting camera...');
  const [scanning, setScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [currentProfileId, setCurrentProfileId] = useState(null);

  useEffect(() => {
    let stream = null;
    let animationId = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        videoRef.current.play();
        animationId = requestAnimationFrame(tick);
        setStatus('Scanning for QR Code...');
      } catch (err) {
        setStatus('Error accessing camera: ' + err.message);
      }
    }

    function tick() {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code) {
          handleQRCode(code.data, stream);
          return;
        }
      }

      animationId = requestAnimationFrame(tick);
    }

    function handleQRCode(text, stream) {
      try {
        const url = new URL(text);
        const parts = url.pathname.split('/');
        const profileId = parts[parts.length - 1];
        setCurrentProfileId(profileId);
        setShowModal(true);
        setStatus('QR Code detected! Please enter password.');
      } catch {
        setStatus('Invalid QR Code. Please try again.');
        animationId = requestAnimationFrame(tick);
      }
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  function closeModal() {
    setShowModal(false);
    setPassword('');
    setCurrentProfileId(null);
    setStatus('Scanning for QR Code...');
  }

  async function verifyPassword() {
    try {
      const res = await fetch(`${API_URL}/profiles/${currentProfileId}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (data.valid) {
        // stop camera and go to edit page
        if (videoRef.current?.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
        navigate(`/edit/${currentProfileId}`);
      } else {
        setStatus('Invalid password. Please try again.');
        closeModal();
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus('Error verifying password. Please try again.');
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Enter') verifyPassword();
  }

  return (
    <>
      <Navbar />

      <main>
        <div className="scanner-container">
          <div className="card">
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e3a8a', textAlign: 'center', marginBottom: '1.5rem' }}>
              QR Code Scanner
            </h1>

            <div style={{ position: 'relative', width: '100%', maxWidth: '32rem', margin: '0 auto 1.5rem' }}>
              <video ref={videoRef} id="qr-video" playsInline />
            </div>

            <div id="status">{status}</div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>
      </main>

      {/* Password Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3 className="modal-title">Enter Password</h3>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyUp={handleKeyUp}
                placeholder="Enter password"
                autoFocus
              />
            </div>

            <div className="btn-group" style={{ justifyContent: 'flex-end' }}>
              <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
              <button onClick={verifyPassword} className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Scanner;
