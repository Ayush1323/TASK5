import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
