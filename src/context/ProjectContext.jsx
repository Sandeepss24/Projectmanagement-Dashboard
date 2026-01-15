import { createContext, useContext, useState } from "react";
import ProjectData from "../data/ProjectData";

const ProjectContext = createContext();

export const useProjects = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjects must be used within ProjectProvider");
    }
    return context;
};

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState(ProjectData);

    const addProject = (projectData) => {
        const newProject = {
            id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
            name: projectData.name,
            completedTasks: parseInt(projectData.completedTasks) || 0,
            totalTasks: parseInt(projectData.totalTasks) || 0,
            dueDate: projectData.endDate || "N/A",
            assignees: projectData.assignees.map(name => name.substring(0, 2).toUpperCase()),
            status: projectData.status,
            priority: projectData.priority,
            description: projectData.description,
            startDate: projectData.startDate,
            manager: projectData.manager,
        };

        setProjects([...projects, newProject]);
        return newProject;
    };

    const updateProject = (id, updatedData) => {
        setProjects(projects.map(p => {
            if (p.id === parseInt(id)) {
                return {
                    ...p,
                    name: updatedData.name,
                    completedTasks: parseInt(updatedData.completedTasks) || 0,
                    totalTasks: parseInt(updatedData.totalTasks) || 0,
                    dueDate: updatedData.endDate || p.dueDate,
                    assignees: updatedData.assignees.map(name => name.substring(0, 2).toUpperCase()),
                    status: updatedData.status,
                    priority: updatedData.priority,
                    description: updatedData.description,
                    startDate: updatedData.startDate,
                    manager: updatedData.manager,
                };
            }
            return p;
        }));
    };

    const deleteProject = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    const getProjectById = (id) => {
        return projects.find(p => p.id === parseInt(id));
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                addProject,
                updateProject,
                deleteProject,
                getProjectById,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
