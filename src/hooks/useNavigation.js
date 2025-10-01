import React from "react";

export function useNavigation() {
  const [currentView, setCurrentView] = React.useState("projects");
  const [selectedProject, setSelectedProject] = React.useState(null);

  const showCreateProject = () => {
    setCurrentView("createProject");
  };

  const showProjects = () => {
    setCurrentView("projects");
  };

  const showProjectDetails = (project) => {
    setSelectedProject(project);
    setCurrentView("details");
  };

  const showTeams = () => {
    setCurrentView("teams");
  };

  const updateSelectedProject = (updatedProject) => {
    setSelectedProject(updatedProject);
  };

  return {
    currentView,
    selectedProject,
    showCreateProject,
    showProjects,
    showProjectDetails,
    showTeams,
    updateSelectedProject
  };
}
