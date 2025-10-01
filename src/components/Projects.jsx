import React from "react";

export default function Projects({ projects = [], teams = [], onDeleteProject, onToggleProjectStatus, onViewDetails }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [projectToDelete, setProjectToDelete] = React.useState(null);

  const getAssignedTeam = (projectId) => {
    return teams.find(team =>
      team.assignedProjects && team.assignedProjects.some(id =>
        id == projectId || String(id) === String(projectId)
      )
    );
  };

  const handleDelete = (projectId, projectName) => {
    setProjectToDelete({ id: projectId, name: projectName });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl text-center text-gray-600 font-bold mb-10 m-10 ">Your Projects</h2>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-64">
          <div className="text-center">
            <img
              src="/src/assets/no-projects.png"
              alt="No projects"
              className="w-24 h-24 mx-auto mb-4 opacity-50"
            />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Yet</h3>
            <p className="text-gray-500 mb-4">
              You haven't created any projects yet. Click "New Project" to get started!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow ${
                !project.isActive ? 'opacity-60' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 flex-1">
                  {project.name}
                </h3>
                <button
                  onClick={() => handleDelete(project.id, project.name)}
                  className="text-red-500 hover:text-red-700 ml-2 p-1"
                  title="Delete Project"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Created on {project.createdAt}
              </p>

              {/* Team Assignment Display */}
              <div className="mb-3">
                {(() => {
                  const assignedTeam = getAssignedTeam(project.id);
                  return assignedTeam ? (
                    <div className="flex items-center justify-between bg-purple-50 rounded-lg p-2 border border-purple-100">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-purple-700">
                            {assignedTeam.name}
                          </span>
                          <p className="text-xs text-purple-600">
                            {assignedTeam.members?.length || 0} members
                          </p>
                        </div>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Assigned
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      <span className="text-sm text-gray-500">
                        No team assigned
                      </span>
                    </div>
                  );
                })()}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => onToggleProjectStatus(project.id)}
                  className={`text-xs text-white px-3 py-1 rounded transition-colors ${
                    project.isActive
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gray-500 hover:bg-gray-600'
                  }`}
                >
                  {project.isActive ? 'Active' : 'Inactive'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => onViewDetails(project)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Project Manager</h3>
                <p className="text-sm text-gray-600">Confirm Deletion</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete <strong>"{projectToDelete?.name}"</strong>?
              This action cannot be undone and all project data will be permanently lost.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
