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
    const [projects, setProjects] = useState(ProjectData.map(p => ({ ...p, tasks: [] })));

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
            tasks: [],
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

    // Task management functions
    const addTask = (projectId, taskData) => {
        setProjects(projects.map(p => {
            if (p.id === parseInt(projectId)) {
                const newTask = {
                    id: p.tasks.length > 0 ? Math.max(...p.tasks.map(t => t.id)) + 1 : 1,
                    ...taskData,
                    createdAt: new Date().toISOString(),
                };
                const updatedTasks = [...p.tasks, newTask];
                const doneTasks = updatedTasks.filter(t => t.status === "Done").length;

                return {
                    ...p,
                    tasks: updatedTasks,
                    totalTasks: updatedTasks.length,
                    completedTasks: doneTasks,
                };
            }
            return p;
        }));
    };

    const updateTaskStatus = (projectId, taskId, newStatus) => {
        setProjects(projects.map(p => {
            if (p.id === parseInt(projectId)) {
                const updatedTasks = p.tasks.map(t =>
                    t.id === taskId ? { ...t, status: newStatus } : t
                );
                const doneTasks = updatedTasks.filter(t => t.status === "Done").length;

                return {
                    ...p,
                    tasks: updatedTasks,
                    completedTasks: doneTasks,
                };
            }
            return p;
        }));
    };

    const deleteTask = (projectId, taskId) => {
        setProjects(projects.map(p => {
            if (p.id === parseInt(projectId)) {
                const updatedTasks = p.tasks.filter(t => t.id !== taskId);
                const doneTasks = updatedTasks.filter(t => t.status === "Done").length;

                return {
                    ...p,
                    tasks: updatedTasks,
                    totalTasks: updatedTasks.length,
                    completedTasks: doneTasks,
                };
            }
            return p;
        }));
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                addProject,
                updateProject,
                deleteProject,
                getProjectById,
                addTask,
                updateTaskStatus,
                deleteTask,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
