import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        <div>
            <h1>NBA Legends</h1>
            {
                legends.map((legend) => (
                    <ul key={legend.id}>
                        <li>{legend.first_name} {legend.last_name}</li>
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