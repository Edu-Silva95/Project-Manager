import React from "react";

export function useTeams() {
  // Load teams from localStorage on initial render
  const [teams, setTeams] = React.useState(() => {
    const savedTeams = localStorage.getItem('teams');
    return savedTeams ? JSON.parse(savedTeams) : [];
  });

  // Save teams to localStorage whenever teams state changes
  React.useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  const createTeam = (teamName) => {
    const newTeam = {
      id: Date.now(),
      name: teamName,
      members: [],
      assignedProjects: [],
      createdAt: new Date().toLocaleDateString()
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
  };

  const deleteTeam = (teamId) => {
    setTeams(prevTeams =>
      prevTeams.filter(team => team.id !== teamId)
    );
  };

  const addMember = (teamId, memberData) => {
    const newMember = {
      id: Date.now(),
      name: memberData.name,
      role: memberData.role,
      joinedAt: new Date().toLocaleDateString()
    };

    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? { ...team, members: [...(team.members || []), newMember] }
          : team
      )
    );
  };

  const deleteMember = (teamId, memberId) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? {
              ...team,
              members: team.members.filter(member => member.id !== memberId)
            }
          : team
      )
    );
  };

  const assignProject = (teamId, projectId) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? {
              ...team,
              assignedProjects: [...(team.assignedProjects || []), projectId]
            }
          : team
      )
    );
  };

  const unassignProject = (teamId, projectId) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId
          ? {
              ...team,
              assignedProjects: team.assignedProjects.filter(id => id !== projectId)
            }
          : team
      )
    );
  };

  return {
    teams,
    createTeam,
    deleteTeam,
    addMember,
    deleteMember,
    assignProject,
    unassignProject
  };
}
