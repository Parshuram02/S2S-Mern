import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:5000/api';

function ProfileView() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
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

  function sendEmergencyAlert() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const emergencyContact = '+91' + profile.emergency_contact;

        try {
          const res = await fetch(`${API_URL.replace('/api', '')}/api/profiles/${id}/send-emergency`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude, emergency_contact: emergencyContact })
          });
          const data = await res.json();
          alert(data.message || data.error);
        } catch (err) {
          console.error('Error:', err);
        }
      },
      (err) => {
        alert('Error getting location: ' + err.message);
      }
    );
  }

  function findNearbyHospitals() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        window.open(`https://www.google.com/maps/search/hospitals/@${lat},${lon},14z`, '_blank');
      },
      () => {
        alert('Location access denied. Please enable location services.');
      }
    );
  }

  if (loading) return <><Navbar /><div className="loading">Loading...</div><Footer /></>;
  if (error) return <><Navbar /><div className="loading">{error}</div><Footer /></>;

  return (
    <>
      <Navbar />

      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="page-title">Profile Details</h1>

          <div className="profile-section">
            <p className="profile-label">Name</p>
            <p className="profile-value">{profile.name}</p>
          </div>

          <div className="profile-section">
            <p className="profile-label">Phone</p>
            <p className="profile-value">{profile.phone}</p>
          </div>

          <div className="profile-section">
            <p className="profile-label">Blood Group</p>
            <p className="profile-value">{profile.blood_group}</p>
          </div>

          <div className="profile-section">
            <p className="profile-label">Emergency Contact</p>
            <p className="profile-value">{profile.emergency_contact || '—'}</p>
          </div>

          <div className="profile-section">
            <p className="profile-label">Medical Conditions</p>
            <p className="profile-value">{profile.medical_conditions || '—'}</p>
          </div>

          <div className="profile-section">
            <p className="profile-label">Allergies</p>
            <p className="profile-value">{profile.allergies || '—'}</p>
          </div>

          <div className="profile-section">
            <p className="profile-label">Current Medications</p>
            <p className="profile-value">{profile.medications || '—'}</p>
          </div>

          <div className="btn-group">
            <button onClick={sendEmergencyAlert} className="btn btn-primary">
              Send Emergency Alert
            </button>
            <button onClick={findNearbyHospitals} className="btn btn-danger">
              🚑 Emergency - Find Nearby Hospitals
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfileView;
