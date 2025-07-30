import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const [favorites, setFavorites] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    first_name: '',
    last_name: '',
    championships: '',
    finals_mvps: '',
    season_mvps: '',
    points: '',
    rebounds: '',
    assists: '',
    field_goal_percentage: '',
    first_team_all_nba: '',
    first_team_all_defense: '',
    dpoy: '',
    scoring_titles: '',
    rebounding_titles: '',
    assist_titles: ''
  });
  const navigate = useNavigate();

  const handleBackToList = () => {
      navigate("/legends");
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(response.data.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (legendId) => {
    try {
        console.log("Attempting to remove favorite with legendId:", legendId);
        const token = window.localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/favorites/${legendId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { legend_id: legendId } // include in request body for backend matching
        });
        setFavorites(favorites.filter((fav) => fav.id !== legendId));
    } catch (error) {
        console.error("Error removing favorite:", error.response?.data || error.message);
    }
};

const handleMoveFavorite = async (index, direction) => {
    const newFavorites = [...favorites];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= favorites.length) return;

   
    [newFavorites[index], newFavorites[targetIndex]] = [newFavorites[targetIndex], newFavorites[index]];
    
    setFavorites(newFavorites);

  
    try {
        const token = window.localStorage.getItem("token");
        await axios.put("http://localhost:3000/api/favorites/reorder", {
            favorites: newFavorites.map((fav, i) => ({
                legend_id: fav.id,
                order_rank: i
            }))
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
    } catch (error) {
        console.error("Error saving new order:", error);
    }
};

const handleAddPlayer = async (e) => {
  e.preventDefault();
  try {
    const token = window.localStorage.getItem("token");
    await axios.post("http://localhost:3000/api/legends", newPlayer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Player submitted for admin approval!");
    setNewPlayer({
      first_name: '',
      last_name: '',
      championships: '',
      finals_mvps: '',
      season_mvps: '',
      points: '',
      rebounds: '',
      assists: '',
      field_goal_percentage: '',
      first_team_all_nba: '',
      first_team_all_defense: '',
      dpoy: '',
      scoring_titles: '',
      rebounding_titles: '',
      assist_titles: ''
    });
  } catch (error) {
    console.error("Error adding player:", error);
    alert("Failed to submit player");
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewPlayer((prev) => ({ ...prev, [name]: value }));
};

  return (
    <div>
      <h1>Your Top 10 All Time</h1>
      <button onClick={handleBackToList}>⬅️ Back to Legends List</button>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((legend, index) => (
            <li key={legend.id}>
              <strong>{index + 1}. {legend.first_name} {legend.last_name}</strong> 
              <button onClick={() => handleMoveFavorite(index, -1)}>⬆️</button>
              <button onClick={() => handleMoveFavorite(index, 1)}>⬇️</button>
              <button onClick={() => handleRemoveFavorite(legend.id)}>❌ Remove</button>
            </li>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </ul>
      <h2>Add a Player</h2>
      <form onSubmit={handleAddPlayer}>
        <input name="first_name" placeholder="First Name" value={newPlayer.first_name} onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" value={newPlayer.last_name} onChange={handleChange} required />
        <input name="championships" placeholder="Championships" type="number" value={newPlayer.championships} onChange={handleChange} />
        <input name="finals_mvps" placeholder="Finals MVPs" type="number" value={newPlayer.finals_mvps} onChange={handleChange} />
        <input name="season_mvps" placeholder="Season MVPs" type="number" value={newPlayer.season_mvps} onChange={handleChange} />
        <input name="points" placeholder="Points per game" type="number" step="0.1" value={newPlayer.points} onChange={handleChange} />
        <input name="rebounds" placeholder="Rebounds per game" type="number" step="0.1" value={newPlayer.rebounds} onChange={handleChange} />
        <input name="assists" placeholder="Assists per game" type="number" step="0.1" value={newPlayer.assists} onChange={handleChange} />
        <input name="field_goal_percentage" placeholder="FG %" type="number" step="0.1" value={newPlayer.field_goal_percentage} onChange={handleChange} />
        <input name="first_team_all_nba" placeholder="1st Team All NBA" type="number" value={newPlayer.first_team_all_nba} onChange={handleChange} />
        <input name="first_team_all_defense" placeholder="1st Team All Defense" type="number" value={newPlayer.first_team_all_defense} onChange={handleChange} />
        <input name="dpoy" placeholder="DPOY Awards" type="number" value={newPlayer.dpoy} onChange={handleChange} />
        <input name="scoring_titles" placeholder="Scoring Titles" type="number" value={newPlayer.scoring_titles} onChange={handleChange} />
        <input name="rebounding_titles" placeholder="Rebounding Titles" type="number" value={newPlayer.rebounding_titles} onChange={handleChange} />
        <input name="assist_titles" placeholder="Assist Titles" type="number" value={newPlayer.assist_titles} onChange={handleChange} />
        <button type="submit">Submit Player</button>
      </form>
    </div>
  );
};

export default UserHome;