import NewProject from "./CreateNewProject";
import Projects from "./Projects";
import Details from "./Details";
import Teams from "./Teams";

export default function MainContent({
  currentView,
  selectedProject,
  projects,
  teams,
  onShowProjects,
  onCreateProject,
  onDeleteProject,
  onToggleProjectStatus,
  onViewDetails,
  onUpdateProject,
  onCreateTeam,
  onDeleteTeam,
  onAddMember,
  onDeleteMember,
  onAssignProject,
  onUnassignProject
}) {
  // Get the current project data from the projects array to ensure it's up-to-date
  const currentProject = selectedProject ? projects.find(p => p.id === selectedProject.id) : null;

  switch(currentView) {
    case "createProject":
      return <NewProject onCancel={onShowProjects} onCreateProject={onCreateProject} />;
    case "details":
      return <Details project={currentProject} onBack={onShowProjects} onUpdateProject={onUpdateProject} />;
    case "teams":
      return (
        <Teams
          teams={teams}
          projects={projects}
          onCreateTeam={onCreateTeam}
          onDeleteTeam={onDeleteTeam}
          onAddMember={onAddMember}
          onDeleteMember={onDeleteMember}
          onAssignProject={onAssignProject}
          onUnassignProject={onUnassignProject}
        />
      );
    case "projects":
    default:
      return (
        <Projects
          projects={projects}
          teams={teams}
          onDeleteProject={onDeleteProject}
          onToggleProjectStatus={onToggleProjectStatus}
          onViewDetails={onViewDetails}
        />
      );
  }
}
