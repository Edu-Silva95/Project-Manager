import React from "react";

export default function NewProject ({ onCancel, onCreateProject }) {
  const [projectName, setProjectName] = React.useState("");
  const [projectDescription, setProjectDescription] = React.useState("");
  const [projectTasks, setProjectTasks] = React.useState("");

  const handleTasksChange = (e) => {
    let value = e.target.value;

    // Auto-format bullet points when user presses Enter
    const lines = value.split('\n');
    const formattedLines = lines.map((line, index) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('•') && !trimmedLine.startsWith('-') && !trimmedLine.startsWith('*')) {
        return `• ${trimmedLine}`;
      }
      return line;
    });

    setProjectTasks(formattedLines.join('\n'));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cursorPosition = e.target.selectionStart;
      const value = e.target.value;
      const beforeCursor = value.substring(0, cursorPosition);
      const afterCursor = value.substring(cursorPosition);

      // Add new line with bullet point
      const newValue = beforeCursor + '\n• ' + afterCursor;
      setProjectTasks(newValue);

      // Set cursor position after the bullet point
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = cursorPosition + 3;
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      const projectData = {
        name: projectName.trim(),
        description: projectDescription.trim(),
        tasks: projectTasks.trim()
      };
      onCreateProject(projectData);
      // Reset form
      setProjectName("");
      setProjectDescription("");
      setProjectTasks("");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl text-gray-600 font-bold mb-10">Create a New Project</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
          required
        />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-vertical"
          rows={3}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Tasks
            <span className="text-gray-500 text-xs ml-2">(Press Enter for new bullet point)</span>
          </label>
          <textarea
            placeholder="• Debugging..."
            value={projectTasks}
            onChange={handleTasksChange}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 resize-vertical font-mono"
            rows={5}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 hover:shadow-md transition-colors disabled:bg-gray-400"
            disabled={!projectName.trim()}
          >
            Create
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
