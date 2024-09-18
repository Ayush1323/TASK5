import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects';
import CurrentProject from './pages/CurrentProject';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/CurrentProject/:name" element={<CurrentProject />} />        
      </Routes>
    </Router>
  );
}

export default App;
