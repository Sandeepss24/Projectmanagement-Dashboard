import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectForm from "./components/ProjectForm";
import Tasks from "./pages/Tasks";
import Reminder from "./pages/Reminder";
import Team from "./pages/Team";
import Settings from "./pages/Settings"

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="tasks" element={<Tasks />} />

        <Route path="projectform" element={<ProjectForm />} />
        <Route path="projectform/:id" element={<ProjectForm />} />
        <Route path="reminders" element={<Reminder />} />
        <Route path="team" element={<Team />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
