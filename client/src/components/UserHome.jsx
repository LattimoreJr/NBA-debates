import axios from "axios";
import { useEffect, useState } from "react";

const UserHome = () => {
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div>
      <h1>Your Top 10 All Time</h1>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((legend, index) => (
            <li key={legend.id}>
              <strong>{index + 1}. {legend.first_name} {legend.last_name}</strong> - {legend.championships} Championships
            </li>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserHome;