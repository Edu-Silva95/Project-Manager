import React from "react";

export function useProjects() {
  // Load projects from localStorage on initial render
  const [projects, setProjects] = React.useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  // Save projects to localStorage whenever projects state changes
  React.useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      name: projectData.name,
      description: projectData.description,
      tasks: projectData.tasks,
      createdAt: new Date().toLocaleDateString(),
      isActive: true
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const deleteProject = (projectId) => {
    setProjects(prevProjects =>
      prevProjects.filter(project => project.id !== projectId)
    );
  };

  const toggleProjectStatus = (projectId) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, isActive: !project.isActive }
          : project
      )
    );
  };

  const updateProject = (projectId, updatedProject) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? updatedProject : project
      )
    );
  };

  return {
    projects,
    createProject,
    deleteProject,
    toggleProjectStatus,
    updateProject
  };
}
