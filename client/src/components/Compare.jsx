import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Compare = () => {
  const { id1, id2 } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get(`http://localhost:3000/api/legends/${id1}`),
          axios.get(`http://localhost:3000/api/legends/${id2}`),
        ]);
        setPlayers([res1.data, res2.data]);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };
    console.log('fetching IDS:', id1, id2)
    if (id1 && id2) fetchPlayers();
  }, [id1, id2]);

  if (players.length !== 2) return <div>Loading players...</div>;

  return (
    <div>
      <h1>Player Comparison</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {players.map((player, index) => (
          <div key={player.id}>
            <h2>{player.first_name} {player.last_name}</h2>
            <p>Championships: {player.championships}</p>
            <p>Finals MVPs: {player.finals_mvps}</p>
            <p>Season MVPs: {player.season_mvps}</p>
            <p>1st Team All NBA: {player.first_team_all_nba}</p>
            <p>1st Team All Defense: {player.first_team_all_defense}</p>
            <p>Points: {player.points}</p>
            <p>Rebounds: {player.rebounds}</p>
            <p>Assists: {player.assists}</p>
            <p>FG%: {player.field_goal_percentage}</p>
            <p>Defensive Player of the Year: {player.dpoy}</p>
            <p>Scoring Titles: {player.scoring_titles}</p>
            <p>Rebound Titles: {player.rebounding_titles}</p>
            <p>Assist Titles: {player.assist_titles}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compare;