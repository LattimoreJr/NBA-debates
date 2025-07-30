import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Legend.css'



const Compare = () => {
  const { id1, id2 } = useParams();
  const [players, setPlayers] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate()


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
    //console.log('fetching IDS:', id1, id2)
    if (id1 && id2) fetchPlayers();
  }, [id1, id2]);

  if (players.length !== 2) return <div>Loading players...</div>;

  // Function to highlight which player has the better stat
  const highlightStat = (statKey, currentIndex) => {
    if (players.length < 2) return '';
    const val1 = players[0][statKey];
    const val2 = players[1][statKey];
    if (val1 === val2) return '';
    const better = val1 > val2 ? 0 : 1;
    return currentIndex === better ? 'stat-better' : 'stat-worse';
  };

  return (
    <div>
      <h1>Player Comparison</h1>
      <div>
        <button onClick={() => setFlipped(!flipped)}>Compare</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {players.map((player, index) => (
          <div className={`card ${flipped ? 'flipped' : ''}`} key={player.id}>
            <div className="card-inner">
              <div className="card-front">
                {player.image_url ? <img className="legend-image" src={player.image_url}/> : null}
                <h2>{player.first_name} {player.last_name}</h2>
                <p>Click to Flip</p>
              </div>
              <div className="card-back">
                <p className={highlightStat('championships', index)} >Championships: {player.championships}</p>
                <p className={highlightStat('finals_mvps', index)} >Finals MVPs: {player.finals_mvps}</p>
                <p className={highlightStat('season_mvps', index)} >Season MVPs: {player.season_mvps}</p>
                <p className={highlightStat('first_team_all_nba', index)} >1st Team All NBA: {player.first_team_all_nba}</p>
                <p className={highlightStat('first_team_all_defense', index)} >1st Team All Defense: {player.first_team_all_defense}</p>
                <p className={highlightStat('points', index)} >Points: {player.points}</p>
                <p className={highlightStat('rebounds', index)} >Rebounds: {player.rebounds}</p>
                <p className={highlightStat('assists', index)} >Assists: {player.assists}</p>
                <p className={highlightStat('field_goal_percentage', index)} >FG%: {player.field_goal_percentage}</p>
                <p className={highlightStat('dpoy', index)} >Defensive Player of the Year: {player.dpoy}</p>
                <p className={highlightStat('scoring_titles', index)} >Scoring Titles: {player.scoring_titles}</p>
                <p className={highlightStat('rebounding_titles', index)} >Rebound Titles: {player.rebounding_titles}</p>
                <p className={highlightStat('assist_titles', index)} >Assist Titles: {player.assist_titles}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={()=>navigate('/legends')}>Back to List</button>
      </div>
    </div>
  );
};

export default Compare;