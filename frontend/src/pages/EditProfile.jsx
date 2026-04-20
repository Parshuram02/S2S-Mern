import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5000/api';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_URL}/profiles/${id}`);
        if (!res.ok) {
          setError('Profile not found.');
          return;
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError('Could not load profile.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/profiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error updating profile');
        return;
      }

      navigate(`/profile/${id}`);
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <><Navbar /><div className="loading">Loading...</div><Footer /></>;
  if (error && !profile) return <><Navbar /><div className="loading">{error}</div><Footer /></>;

  return (
    <>
      <Navbar />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="page-title">Edit Profile</h1>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="form-section">
              <h2 className="form-section-title">Basic Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="blood_group">Blood Group</label>
                  <select id="blood_group" name="blood_group" value={profile.blood_group} onChange={handleChange} required>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="emergency_contact">Emergency Contact</label>
                  <input type="text" id="emergency_contact" name="emergency_contact" value={profile.emergency_contact} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="form-section">
              <h2 className="form-section-title">Medical Information</h2>

              <div className="form-group">
                <label htmlFor="medical_conditions">Medical Conditions</label>
                <textarea id="medical_conditions" name="medical_conditions" rows="3" value={profile.medical_conditions} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Allergies</label>
                <textarea id="allergies" name="allergies" rows="3" value={profile.allergies} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="medications">Current Medications</label>
                <textarea id="medications" name="medications" rows="3" value={profile.medications} onChange={handleChange} />
              </div>
            </div>

            <div className="btn-group" style={{ justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EditProfile;
