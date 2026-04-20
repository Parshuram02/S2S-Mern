const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const QRCode = require('qrcode');
const Profile = require('../models/Profile');

// POST /api/profiles - create a new profile
router.post('/', async (req, res) => {
  try {
    const profileId = crypto.randomBytes(16).toString('hex');

    const profile = new Profile({
      _id: profileId,
      name: req.body.name,
      phone: req.body.phone,
      blood_group: req.body.blood_group,
      template: req.body.template || 'template1',
      password: req.body.password,
      emergency_contact: req.body.emergency_contact || '',
      medical_conditions: req.body.medical_conditions || '',
      allergies: req.body.allergies || '',
      medications: req.body.medications || ''
    });

    await profile.save();

    // Generate QR code pointing to the profile view URL
    const frontendUrl = req.headers.origin || 'http://localhost:5173';
    const profileUrl = `${frontendUrl}/profile/${profileId}`;
    const qrBase64 = await QRCode.toDataURL(profileUrl);

    res.json({ profileId, qrBase64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating profile' });
  }
});

// GET /api/profiles/:id - get a profile by ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/profiles/:id - update a profile
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    // verify password before allowing update
    if (profile.password !== req.body.password) {
      return res.status(403).json({ error: 'Invalid password' });
    }

    profile.name = req.body.name;
    profile.phone = req.body.phone;
    profile.blood_group = req.body.blood_group;
    profile.emergency_contact = req.body.emergency_contact || '';
    profile.medical_conditions = req.body.medical_conditions || '';
    profile.allergies = req.body.allergies || '';
    profile.medications = req.body.medications || '';

    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/profiles/:id/verify-password - check password
router.post('/:id/verify-password', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ valid: false });

    const isValid = profile.password === req.body.password;
    res.json({ valid: isValid });
  } catch (err) {
    res.status(500).json({ valid: false });
  }
});

// GET /api/profiles/:id/qr - get QR code for a profile
router.get('/:id/qr', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    const frontendUrl = req.headers.origin || 'http://localhost:5173';
    const profileUrl = `${frontendUrl}/profile/${req.params.id}`;
    const qrBuffer = await QRCode.toBuffer(profileUrl);

    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', `attachment; filename="qr_code_${req.params.id}.png"`);
    res.send(qrBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Error generating QR code' });
  }
});

module.exports = router;
