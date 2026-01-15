import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectForm from "./components/ProjectForm";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />

        {/* Create and Edit Project Form */}
        <Route path="projectform" element={<ProjectForm />} />
        <Route path="projectform/:id" element={<ProjectForm />} />
      </Route>
    </Routes>
  );
}

export default App;
