import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Legend.css'

const Legends = ({ legends, setLegends }) => {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    if (!Array.isArray(legends)) {
        return <div>Loading legends...</div>;
    }

    const handleSelect = (id) => {
        if (selected.includes(id)) return;

        const updated = [...selected, id];
        setSelected(updated);

        if (updated.length === 2) {
            navigate(`/compare/${updated[0]}/${updated[1]}`);
        }
    };

    const handleAddFavorite = async (id) => {
        try {
            const token = window.localStorage.getItem("token");
            await axios.post(`/api/favorites/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Player added to favorites!");
        } catch (error) {
            console.error("Error adding favorite:", error);
            alert("Could not add player to favorites");
        }
    };

    // Random Matchup handler
    const handleRandomMatchup = () => {
        if (legends.length < 2) return;
        const shuffled = [...legends].sort(() => 0.5 - Math.random());
        const selectedPair = shuffled.slice(0, 2).map(player => player.id);
        navigate(`/compare/${selectedPair[0]}/${selectedPair[1]}`);
    };

    return (
        <div className="legend-container">
            <h1>NBA Legends</h1>
            <div>
                <button className="random-matchup-btn" onClick={handleRandomMatchup}>
                Random Matchup
            </button>
            </div>
            {
                legends.map((legend) => (
                    <div key={legend.id} className="player-card">
                        <div className="card-header">{legend.first_name} {legend.last_name}</div>
                        {legend.image_url && (
                            <div className="legend-image-wrapper">
                                <img
                                    className="legend-image"
                                    src={legend.image_url}
                                    alt={`${legend.first_name} ${legend.last_name}`}
                                />
                            </div>
                        )}
                        <button onClick={() => handleSelect(legend.id)}>
                            {selected.includes(legend.id) ? "Selected" : "Select"}
                        </button>
                        <button onClick={() => handleAddFavorite(legend.id)}>
                            Add to Favorites
                        </button>
                        <div className="card-footer">Click select to compare</div>
                    </div>
                ))
            }
        </div>
    );
};

export default Legends;
