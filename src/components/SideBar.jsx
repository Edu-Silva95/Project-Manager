export default function SideBar({ onNewProject, onShowProjects, onShowTeams, currentView }) {
  return (
    <aside className="w-72 bg-gray-100 p-4 pb-0 z-10" style={{
      minHeight: '100vh',
      marginBottom: '-60px',
      paddingBottom: '60px',
    }}>
      <nav>
        <h1 className="text-center font-extrabold text-lg text-gray-600 mb-9">Dashboard</h1>
        <ul>
          <li className="mb-2">
            <button
              className={`w-full text-center px-4 py-2 rounded-lg transition-colors mb-8 underline ${
                currentView === "createProject"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-600"
              }`}
              onClick={onNewProject}
            >
              + Add Project
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                currentView === "projects"
                  ? "bg-gray-600 text-white"
                  : "text-gray-700 hover:bg-gray-300 hover:text-gray-600"
              }`}
              onClick={onShowProjects}
            >
              Projects
            </button>
          </li>
          <li className="mb-2">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                currentView === "teams"
                  ? "bg-gray-600 text-white"
                  : "text-gray-700 hover:bg-gray-300 hover:text-gray-600"
              }`}
              onClick={onShowTeams}
            >
              Teams
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
