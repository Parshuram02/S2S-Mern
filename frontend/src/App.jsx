import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateProfile from './pages/CreateProfile';
import QRDisplay from './pages/QRDisplay';
import ProfileView from './pages/ProfileView';
import EditProfile from './pages/EditProfile';
import Scanner from './pages/Scanner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/qr/:id" element={<QRDisplay />} />
        <Route path="/profile/:id" element={<ProfileView />} />
        <Route path="/edit/:id" element={<EditProfile />} />
        <Route path="/scanner" element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
