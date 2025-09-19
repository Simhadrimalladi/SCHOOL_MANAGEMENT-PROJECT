// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Teachers from "./pages/TeachersPage";  // your Teachers component
import StudentsPage from './pages/StudentsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/teachers" element={<Teachers />} />
         <Route path="/students" element={<StudentsPage />} />     
          {/* Add more child routes like students, parents, etc. */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
