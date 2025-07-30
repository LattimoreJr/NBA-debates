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

    return (
        <div className="legend-container">
            <h1>NBA Legends</h1>
            {
                legends.map((legend) => (
                    <ul key={legend.id} className="legend-card">
                        <li>
                           {legend.image_url ? (
                               <div className="legend-image-wrapper">
                                   <img className="legend-image" src={legend.image_url} alt={`${legend.first_name} ${legend.last_name}`} />
                               </div>
                           ) : null}
                            <br/>
                            {legend.first_name} {legend.last_name}
                        </li>
                        <button onClick={() => handleSelect(legend.id)}>
                            {selected.includes(legend.id) ? "Selected" : "Select"}
                        </button>
                    </ul>
                ))
            }
        </div>
    );
};

export default Legends;
