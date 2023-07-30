import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Providers from './providers/Providers';
import Home from './pages/Home';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Providers>
  );
}
