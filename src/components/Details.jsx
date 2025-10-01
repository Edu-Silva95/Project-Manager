import React from "react";

export default function Details({ project, onBack, onUpdateProject }) {
  const [isEditingDescription, setIsEditingDescription] = React.useState(false);
  const [isEditingTasks, setIsEditingTasks] = React.useState(false);
  const [editedDescription, setEditedDescription] = React.useState(project?.description || "");
  const [editedTasks, setEditedTasks] = React.useState(project?.tasks || "");

  // Update local state when project changes
  React.useEffect(() => {
    if (project) {
      setEditedDescription(project.description || "");
      setEditedTasks(project.tasks || "");
    }
  }, [project]);

  const handleSaveDescription = () => {
    if (onUpdateProject) {
      onUpdateProject(project.id, { ...project, description: editedDescription });
    }
    setIsEditingDescription(false);
  };

  const handleSaveTasks = () => {
    if (onUpdateProject) {
      onUpdateProject(project.id, { ...project, tasks: editedTasks });
    }
    setIsEditingTasks(false);
  };

  const handleCancelDescription = () => {
    setEditedDescription(project.description || "");
    setIsEditingDescription(false);
  };

  const handleCancelTasks = () => {
    setEditedTasks(project.tasks || "");
    setIsEditingTasks(false);
  };

  if (!project) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-6">Project Details</h2>
        <p className="text-gray-600">No project selected.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </button>

          <span className={`px-3 py-1 rounded text-sm text-white ${
            project.isActive ? 'bg-green-500' : 'bg-gray-500'
          }`}>
            {project.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.name}</h1>
            <p className="text-gray-600">Created on {project.createdAt}</p>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-800">Description</h3>
              {!isEditingDescription && (
                <button
                  onClick={() => setIsEditingDescription(true)}
                  className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border">
              {isEditingDescription ? (
                <div>
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 resize-vertical"
                    rows={4}
                    placeholder="Enter project description..."
                  />
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={handleCancelDescription}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveDescription}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                project.description ? (
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                ) : (
                  <p className="text-gray-500 italic">No description provided</p>
                )
              )}
            </div>
          </div>

          {/* Tasks Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-800">Tasks</h3>
              {!isEditingTasks && (
                <button
                  onClick={() => setIsEditingTasks(true)}
                  className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              )}
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border">
              {isEditingTasks ? (
                <div>
                  <textarea
                    value={editedTasks}
                    onChange={(e) => setEditedTasks(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 resize-vertical font-mono"
                    rows={6}
                    placeholder="• Enter your tasks here (one per line)
• Each line will be displayed as a bullet point
• Press Enter for new lines"
                  />
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={handleCancelTasks}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveTasks}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                project.tasks ? (
                  <div className="text-gray-700 leading-relaxed">
                    {project.tasks.split('\n').map((task, index) => (
                      <div key={index} className="mb-2 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{task.replace(/^[•\-\*]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No tasks specified</p>
                )
              )}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Project ID</h4>
              <p className="text-gray-600">{project.id}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Status</h4>
              <p className="text-gray-600">{project.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
