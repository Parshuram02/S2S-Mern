import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5000/api';

function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    blood_group: '',
    password: '',
    emergency_contact: '',
    medical_conditions: '',
    allergies: '',
    medications: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, template: 'template1' })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error creating profile');
        return;
      }

      // go to QR display page
      navigate(`/qr/${data.profileId}`, { state: { qrBase64: data.qrBase64 } });
    } catch (err) {
      setError('Could not connect to server. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="form-container">
          <div className="card">
            <h1 className="page-title" style={{ textAlign: 'center' }}>Create Your Profile</h1>

            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="blood_group">Blood Group</label>
                <select id="blood_group" name="blood_group" value={form.blood_group} onChange={handleChange} required>
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password (for viewing sensitive info)</label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="emergency_contact">Emergency Contact</label>
                <input type="text" id="emergency_contact" name="emergency_contact" value={form.emergency_contact} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="medical_conditions">Medical Conditions</label>
                <textarea id="medical_conditions" name="medical_conditions" rows="3" value={form.medical_conditions} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Allergies</label>
                <textarea id="allergies" name="allergies" rows="3" value={form.allergies} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="medications">Current Medications</label>
                <textarea id="medications" name="medications" rows="3" value={form.medications} onChange={handleChange} />
              </div>

              <div className="btn-center">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate QR Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CreateProfile;
