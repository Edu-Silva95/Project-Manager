import React from "react";

export default function Teams({ teams = [], projects = [], onCreateTeam, onAddMember, onAssignProject, onDeleteTeam, onDeleteMember, onUnassignProject }) {
  const [showCreateTeam, setShowCreateTeam] = React.useState(false);
  const [showAddMember, setShowAddMember] = React.useState(null); // teamId
  const [showAssignProject, setShowAssignProject] = React.useState(null); // teamId
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [teamToDelete, setTeamToDelete] = React.useState(null);
  const [newTeamName, setNewTeamName] = React.useState("");
  const [newMemberName, setNewMemberName] = React.useState("");
  const [newMemberRole, setNewMemberRole] = React.useState("");
  const [selectedProjectId, setSelectedProjectId] = React.useState("");

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      onCreateTeam(newTeamName.trim());
      setNewTeamName("");
      setShowCreateTeam(false);
    }
  };

  const handleAddMember = (teamId) => {
    if (newMemberName.trim() && newMemberRole.trim()) {
      onAddMember(teamId, {
        name: newMemberName.trim(),
        role: newMemberRole.trim()
      });
      setNewMemberName("");
      setNewMemberRole("");
      setShowAddMember(null);
    }
  };

  const handleAssignProject = (teamId) => {
    if (selectedProjectId) {
      onAssignProject(teamId, selectedProjectId);
      setSelectedProjectId("");
      setShowAssignProject(null);
    }
  };

  const getUnassignedProjects = () => {
    return projects.filter(project =>
      !teams.some(team => team.assignedProjects && team.assignedProjects.some(id =>
        id == project.id || String(id) === String(project.id)
      ))
    );
  };

  const handleDeleteTeam = (teamId, teamName) => {
    setTeamToDelete({ id: teamId, name: teamName });
    setShowDeleteModal(true);
  };

  const confirmDeleteTeam = () => {
    if (teamToDelete) {
      onDeleteTeam(teamToDelete.id);
      setShowDeleteModal(false);
      setTeamToDelete(null);
    }
  };

  const cancelDeleteTeam = () => {
    setShowDeleteModal(false);
    setTeamToDelete(null);
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-600">Teams</h2>
          <button
            onClick={() => setShowCreateTeam(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Team
          </button>
        </div>

        {/* Create Team Modal */}
        {showCreateTeam && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Team</h3>
              <form onSubmit={handleCreateTeam}>
                <input
                  type="text"
                  placeholder="Team Name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateTeam(false);
                      setNewTeamName("");
                    }}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Teams Grid */}
        {teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-64">
            <div className="text-center">
              <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Teams Yet</h3>
              <p className="text-gray-500">Create your first team to get started!</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <div key={team.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                {/* Team Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
                  <button
                    onClick={() => handleDeleteTeam(team.id, team.name)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Delete Team"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Team Members */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Members ({team.members?.length || 0})</h4>
                    <button
                      onClick={() => setShowAddMember(team.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      + Add Member
                    </button>
                  </div>
                  {team.members && team.members.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {team.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between bg-blue-50 rounded p-2">
                          <div>
                            <p className="text-sm font-medium text-blue-800">{member.name}</p>
                            <p className="text-xs text-blue-600">{member.role}</p>
                          </div>
                          <button
                            onClick={() => onDeleteMember(team.id, member.id)}
                            className="text-red-400 hover:text-red-600 p-1 flex items-center justify-center"
                            title="Remove Member"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No members yet</p>
                  )}
                </div>

                {/* Assigned Projects */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-700">Projects ({team.assignedProjects?.length || 0})</h4>
                    <button
                      onClick={() => setShowAssignProject(team.id)}
                      className="text-green-500 hover:text-green-700 text-sm"
                    >
                      + Assign Project
                    </button>
                  </div>
                  {team.assignedProjects && team.assignedProjects.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {team.assignedProjects.map((projectId) => {
                        const project = projects.find(p => p.id == projectId || p.id === String(projectId) || String(p.id) === String(projectId));
                        return project ? (
                          <div key={projectId} className="bg-blue-50 rounded px-3 py-2 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-blue-800">{project.name}</p>
                              <p className="text-xs text-blue-600">Status: {project.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                            <button
                              onClick={() => onUnassignProject(team.id, projectId)}
                              className="text-red-500 hover:text-red-700 p-1 flex items-center justify-center"
                              title="Remove Project"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div key={projectId} className="bg-red-50 rounded px-3 py-2 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-red-800">Project not found (ID: {projectId})</p>
                              <p className="text-xs text-red-600">This project may have been deleted</p>
                            </div>
                            <button
                              onClick={() => onUnassignProject(team.id, projectId)}
                              className="text-red-500 hover:text-red-700 p-1 flex items-center justify-center"
                              title="Remove Invalid Project"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No projects assigned</p>
                  )}
                </div>

                {/* Add Member Modal */}
                {showAddMember === team.id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Team Member</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Member Name"
                          value={newMemberName}
                          onChange={(e) => setNewMemberName(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <input
                          type="text"
                          placeholder="Role (e.g., Developer, Designer, Manager)"
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setShowAddMember(null);
                              setNewMemberName("");
                              setNewMemberRole("");
                            }}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAddMember(team.id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Add Member
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assign Project Modal */}
                {showAssignProject === team.id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign Project to {team.name}</h3>
                      <div className="space-y-3">
                        {getUnassignedProjects().length > 0 ? (
                          <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                          >
                            <option value="">Select a project...</option>
                            {getUnassignedProjects().map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.name} {project.isActive ? '(Active)' : '(Inactive)'}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <p className="text-yellow-800 text-sm">
                              No unassigned projects available. All projects have been assigned to teams or there are no projects created yet.
                            </p>
                          </div>
                        )}
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setShowAssignProject(null);
                              setSelectedProjectId("");
                            }}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                          {getUnassignedProjects().length > 0 && (
                            <button
                              onClick={() => handleAssignProject(team.id)}
                              disabled={!selectedProjectId}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
                            >
                              Assign Project
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Team Confirmation Modal */}
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
                <h3 className="text-lg font-semibold text-gray-900">Team Manager</h3>
                <p className="text-sm text-gray-600">Confirm Deletion</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete team <strong>"{teamToDelete?.name}"</strong>?
              This action cannot be undone and all team data, including members and project assignments, will be permanently lost.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDeleteTeam}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTeam}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
