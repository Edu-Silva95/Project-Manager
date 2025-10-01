import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import { useProjects } from "./hooks/useProjects";
import { useTeams } from "./hooks/useTeams";
import { useNavigation } from "./hooks/useNavigation";

function App() {
  const { projects, createProject, deleteProject, toggleProjectStatus, updateProject } = useProjects();
  const { teams, createTeam, deleteTeam, addMember, deleteMember, assignProject, unassignProject } = useTeams();
  const { currentView, selectedProject, showCreateProject, showProjects, showProjectDetails, showTeams, updateSelectedProject } = useNavigation();

  const handleCreateProject = (projectData) => {
    createProject(projectData);
    showProjects(); // Navigate back to projects after creation
  };

  const handleUpdateProject = (projectId, updatedProject) => {
    updateProject(projectId, updatedProject);
    // Also update the selected project if it's the one being edited
    if (selectedProject && selectedProject.id === projectId) {
      updateSelectedProject(updatedProject);
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex">
        <SideBar
          onNewProject={showCreateProject}
          onShowProjects={showProjects}
          onShowTeams={showTeams}
          currentView={currentView}
        />
        <MainContent
          currentView={currentView}
          selectedProject={selectedProject}
          projects={projects}
          teams={teams}
          // ------------- Projects Page -------------
          onShowProjects={showProjects}
          onCreateProject={handleCreateProject}
          onDeleteProject={deleteProject}
          onToggleProjectStatus={toggleProjectStatus}
          onViewDetails={showProjectDetails}
          onUpdateProject={handleUpdateProject}
          // ------------- Teams Page -------------
          onCreateTeam={createTeam}
          onDeleteTeam={deleteTeam}
          onAddMember={addMember}
          onDeleteMember={deleteMember}
          onAssignProject={assignProject}
          onUnassignProject={unassignProject}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
